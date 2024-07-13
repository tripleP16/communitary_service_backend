import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateBeneficiariesDao } from '../dao/create.beneficiaries.dao';
import { Beneficiaries } from '../entities/beneficiary.entity';
import { BeneficiariesMapper } from '../mappers/beneficiaries.mapper';

@Injectable()
export class BeneficiariesRepository {
  constructor(
    @InjectModel(Beneficiaries.name)
    private _beneficiariesModel: Model<Beneficiaries>,
  ) {}

  async createBeneficiary(
    beneficiaries: CreateBeneficiariesDao,
  ): Promise<Beneficiaries> {
    try {
      const newBeneficiary = new this._beneficiariesModel(beneficiaries);
      return await newBeneficiary.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Beneficiary already exists');
      }
      throw new Error(error);
    }
  }

  async getBeneficiaries(query: PaginationParamsDto) {
    try {
      const condition = this.buildSearchCondition(query.searchKey);
      if (query.page != null && query.pageSize != null) {
        return await this.getBeneficiariesWithPagination(query, condition);
      }
      return await this.getBeneficiariesWithoutPagination(condition);
    } catch (error) {
      throw new NotFoundException('Failed to fetch beneficiaries');
    }
  }

  private buildSearchCondition(searchKey?: string) {
    return searchKey
      ? {
          $or: [
            { name: new RegExp(searchKey, 'i') },
            { lastname: new RegExp(searchKey, 'i') },
          ],
        }
      : {};
  }

  async getBeneficiariesWithPagination(
    query: PaginationParamsDto,
    condition: any = {},
  ) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;
    const totalCount = await this._beneficiariesModel.countDocuments(condition);
    const totalPages = Math.ceil(totalCount / pageSize);

    const beneficiaries = await this.fetchBeneficiaries(
      condition,
      skip,
      pageSize,
    );
    if (!beneficiaries.length) {
      throw new NotFoundException('No beneficiaries found');
    }

    return BeneficiariesMapper.mapToBeneficiariesPaginated(
      beneficiaries,
      totalPages,
      page < totalPages,
      page > 1,
      page,
      pageSize,
    );
  }

  async getBeneficiariesWithoutPagination(condition: any = {}) {
    const beneficiaries = await this.fetchBeneficiaries(condition);
    if (!beneficiaries.length) {
      throw new NotFoundException('No beneficiaries found');
    }
    return beneficiaries.map(BeneficiariesMapper.mapToGetDao);
  }

  private async fetchBeneficiaries(
    condition: any,
    skip?: number,
    limit?: number,
  ) {
    const query = this._beneficiariesModel.find(condition).populate('alergies');
    if (skip != null && limit != null) {
      query.skip(skip).limit(limit);
    }
    return query.exec();
  }

  async getBeneficiaryById(id: string) {
    const beneficiary = await this._beneficiariesModel
      .findById(id)
      .populate('alergies');
    if (!beneficiary) {
      throw new NotFoundException('Beneficiary not found');
    }
    return BeneficiariesMapper.mapToGetDao(beneficiary);
  }
}
