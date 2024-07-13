import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseIdDto } from 'src/utils/shared/dtos/base.id.dto';
import { Alergies } from '../entities/alergies.entity';

@Injectable()
export class AlergiesRepository {
  constructor(
    @InjectModel(Alergies.name) private _alergiesModel: Model<Alergies>,
  ) {}

  async createAlergies(alergies: Alergies[]): Promise<Alergies[]> {
    try {
      return await this._alergiesModel.insertMany(alergies);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Alergy already exists');
      }
    }
  }

  async getAlergies(): Promise<Alergies[]> {
    return await this._alergiesModel.find().exec();
  }
  async getAlergiesById(id: BaseIdDto) {
    try {
      return await this._alergiesModel.findById(id.id).exec();
    } catch (error) {
      throw new NotFoundException('Alergies not found');
    }
  }
}
