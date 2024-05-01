import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Privileges } from '../entities/privileges.entity';

export class PrivilegesRepository {
  constructor(
    @InjectModel(Privileges.name) private _privileModel: Model<Privileges>,
  ) {}

  async findPrivilegeByName(name: string): Promise<Privileges | null> {
    return this._privileModel
      .findOne({
        name: name,
      })
      .exec();
  }

  async findPrivilegeById(id: string): Promise<Privileges> {
    return this._privileModel.findById(id).populate('actions').exec();
  }

  async findPrivileges(): Promise<Privileges[]> {
    return this._privileModel.find().populate('actions').exec();
  }
}
