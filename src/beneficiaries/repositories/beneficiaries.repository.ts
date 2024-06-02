import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBeneficiariesDao } from '../dao/create.beneficiaries.dao';
import { Beneficiaries } from '../entities/beneficiary.entity';

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
      console.log(error);
      throw new Error(error);
    }
  }
}
