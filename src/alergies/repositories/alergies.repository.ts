import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
