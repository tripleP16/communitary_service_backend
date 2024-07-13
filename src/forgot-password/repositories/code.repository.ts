import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { CodeDao } from '../dao/code.dao';
import { CodeEntity } from '../entities/code.entity';
import { Model } from 'mongoose';

@Injectable()
export class CodeRepository {
  constructor(
    @InjectModel(CodeEntity.name)
    private _codeModel: Model<CodeEntity>,
  ) {}

  async createCode(codeDao: CodeDao) {
    try {
      const newCode = new this._codeModel(codeDao);
      return await newCode.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCodeByCode(code: string) {
    try {
      return await this._codeModel.findOne({ code });
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCodesForUser(email: string) {
    try {
      return await this._codeModel.deleteMany({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async clearCode(code: string) {
    try {
      return await this._codeModel.deleteOne({ code });
    } catch (error) {
      throw new Error(error);
    }
  }
}
