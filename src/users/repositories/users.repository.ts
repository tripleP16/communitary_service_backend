import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../entities/users.entity';
import { Model } from 'mongoose';
import { CreateUserDao } from '../dao/create.user.dao';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private _usersModel: Model<Users>) {}

  async createUser(user: CreateUserDao): Promise<Users> {
    try {
      const newUser = new this._usersModel(user);
      return await newUser.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }
}
