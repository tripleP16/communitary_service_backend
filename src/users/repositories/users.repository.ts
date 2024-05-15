import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDao } from '../dao/create.user.dao';
import { Users } from '../entities/users.entity';

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

  async getUserByEmail(
    email: string,
    isActive: boolean = true,
  ): Promise<Users | null> {
    return await this._usersModel
      .findOne({
        email: email,
        isActive: isActive,
      })
      .populate({
        path: 'privileges',
        populate: {
          path: 'actions',
        },
      })
      .exec();
  }

  async getUserById(
    id: string,
    isActive: boolean = true,
  ): Promise<Users | null> {
    return await this._usersModel
      .findOne({
        _id: id,
        isActive: isActive,
      })
      .populate({
        path: 'privileges',
        populate: {
          path: 'actions',
        },
      })
      .exec();
  }
}
