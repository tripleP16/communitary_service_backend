import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDao } from '../dao/create.user.dao';
import { Users } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private _usersModel: Model<Users>) { }

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

  async updatePassword(userId: string, hashedPassword: string) {
    try {
      await this._usersModel.updateOne(
        { _id: userId },
        { password: hashedPassword },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: string) {

    const result = await this._usersModel.updateOne({ _id: userId }, { isActive: false });

    if (result.matchedCount === 0) {
      throw new NotFoundException('User not found');
    }

  }

}
