import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Privileges } from '../entities/privileges.entity';
import { NotFoundException } from '@nestjs/common';

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

  async findPrivileges(getActions: boolean = true): Promise<Privileges[]> {
    const base = this._privileModel.find();
    if (getActions) {
      base.populate('actions');
    }
    return base.exec();
  }

  async verifyPrivilegesExists(ids: string[]): Promise<Privileges[]> {
    const privileges = await this._privileModel
      .find({ _id: { $in: ids } })
      .exec();

    if (privileges.length === ids.length) return privileges;

    throw new NotFoundException(
      'One or many selected privileges does not exist',
    );
  }
}
