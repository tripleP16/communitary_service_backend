import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Beneficiaries } from 'src/beneficiaries/entities/beneficiary.entity';
import { ReportType } from '../dtos/enums/report.type.enum';
import { GetGlobalReportDtoToService } from '../dtos/get.global.report.dto';

@Injectable()
export class ReportsGlobalRepository {
  constructor(
    @InjectModel(Beneficiaries.name)
    private _beneficiariesModel: Model<Beneficiaries>,
  ) {}

  async getGlobalReport(dto: GetGlobalReportDtoToService) {
    const { type, isYearly } = dto;
    const currentYear = new Date().getFullYear();

    const pipeline: PipelineStage[] = [
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
          _id: isYearly
            ? { $year: '$medicalHistories.createdAt' }
            : { $month: '$medicalHistories.createdAt' },
          value: { $avg: this.getProjectionForType(type) },
        },
      },
      {
        $project: {
          x: '$_id',
          value: 1,
          _id: 0,
        },
      },
      {
        $sort: { x: 1 },
      },
    );

    if (!isYearly) {
      pipeline.push(
        {
          $group: {
            _id: null,
            data: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            data: {
              $map: {
                input: { $range: [1, 13] },
                as: 'month',
                in: {
                  $let: {
                    vars: {
                      monthData: {
                        $filter: {
                          input: '$data',
                          cond: { $eq: ['$$this.x', '$$month'] },
                        },
                      },
                    },
                    in: {
                      x: '$$month',
                      value: {
                        $ifNull: [
                          { $arrayElemAt: ['$$monthData.value', 0] },
                          null,
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $unwind: '$data',
        },
        {
          $replaceRoot: { newRoot: '$data' },
        },
      );
    }

    return this._beneficiariesModel.aggregate(pipeline);
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
