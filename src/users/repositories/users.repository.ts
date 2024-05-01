import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../entities/users.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private _usersModel: Model<Users>) {}
}
