import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Beneficiaries } from 'src/beneficiaries/entities/beneficiary.entity';
import { ReportType } from '../dtos/enums/report.type.enum';
import { GetBeneficiariesReportDtoToService } from '../dtos/get.beneficiaries.report.dto';

@Injectable()
export class ReportsBeneficiaryRepository {
  constructor(
    @InjectModel(Beneficiaries.name)
    private _beneficiariesModel: Model<Beneficiaries>,
  ) {}

  async getBeneficiariesReport(dto: GetBeneficiariesReportDtoToService) {
    const { type, isYearly, beneficiariesIds } = dto;

    // Check if all beneficiaries exist
    const existingBeneficiaries = await this._beneficiariesModel
      .find({
        _id: { $in: beneficiariesIds },
      })
      .select('_id name')
      .lean();

    if (existingBeneficiaries.length !== beneficiariesIds.length) {
      const existingIds = existingBeneficiaries.map((b) => b._id.toString());
      const missingIds = beneficiariesIds.filter(
        (id) => !existingIds.includes(id),
      );
      throw new NotFoundException(
        `Beneficiaries not found: ${missingIds.join(', ')}`,
      );
    }

    const currentYear = new Date().getFullYear();

    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: { $in: beneficiariesIds },
        },
      },
      {
        $unwind: '$medicalHistories',
      },
    ];

    if (!isYearly) {
      pipeline.push({
        $match: {
          'medicalHistories.createdAt': {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      });
    }

    pipeline.push(
      {
        $group: {
          _id: {
            beneficiaryId: '$_id',
            timePeriod: isYearly
              ? { $year: '$medicalHistories.createdAt' }
              : { $month: '$medicalHistories.createdAt' },
          },
          value: { $avg: this.getProjectionForType(type) },
        },
      },
      {
        $project: {
          _id: 0,
          beneficiaryId: '$_id.beneficiaryId',
          x: '$_id.timePeriod',
          y: '$value',
        },
      },
      {
        $sort: { beneficiaryId: 1, x: 1 },
      },
      {
        $group: {
          _id: '$beneficiaryId',
          points: {
            $push: {
              x: '$x',
              y: '$y',
            },
          },
        },
      },
    );

    if (!isYearly) {
      pipeline.push({
        $project: {
          _id: 0,
          beneficiaryId: '$_id',
          points: {
            $map: {
              input: { $range: [1, 13] },
              as: 'month',
              in: {
                $let: {
                  vars: {
                    monthData: {
                      $filter: {
                        input: '$points',
                        cond: { $eq: ['$$this.x', '$$month'] },
                      },
                    },
                  },
                  in: {
                    x: '$$month',
                    y: {
                      $ifNull: [{ $arrayElemAt: ['$$monthData.y', 0] }, null],
                    },
                  },
                },
              },
            },
          },
        },
      });
    } else {
      pipeline.push({
        $project: {
          _id: 0,
          beneficiaryId: '$_id',
          points: 1,
        },
      });
    }

    const results = await this._beneficiariesModel.aggregate(pipeline);

    // Merge with beneficiary names
    return results.map((result) => {
      const beneficiary = existingBeneficiaries.find(
        (b) => b._id.toString() === result.beneficiaryId.toString(),
      );
      return {
        beneficiaryId: result.beneficiaryId,
        name: beneficiary.name,
        points: result.points,
      };
    });
  }

  private getProjectionForType(type: ReportType): any {
    switch (type) {
      case ReportType.weight:
        return '$medicalHistories.weight';
      case ReportType.height:
        return '$medicalHistories.height';
      case ReportType.bmi:
        return {
          $divide: [
            '$medicalHistories.weight',
            {
              $pow: [{ $divide: ['$medicalHistories.height', 100] }, 2],
            },
          ],
        };
    }
  }
}
