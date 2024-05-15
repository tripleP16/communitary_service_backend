import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Actions } from '../entities/actions.entity';
import { Model } from 'mongoose';

@Injectable()
export class ActionsRepository {
  constructor(
    @InjectModel(Actions.name) private actionsModel: Model<Actions>,
  ) {}

  async findByPrivilegesId(id: string): Promise<Actions[]> {
    return this.actionsModel
      .find({
        privileges: id,
      })
      .populate('privileges')
      .exec();
  }
}
