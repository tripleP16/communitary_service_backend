import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParamsDto } from 'src/utils/shared/dtos/pagination.params.dto';
import { CreateUserDao } from '../dao/create.user.dao';
import { EditUsersMeDto } from '../dtos/edit.user.me.dto';
import { Users } from '../entities/users.entity';
import { UsersMapper } from '../mappers/users.mapper';

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
    const result = await this._usersModel.updateOne(
      { _id: userId },
      { isActive: false },
    );

    if (result.matchedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(userId: string, dto: CreateUserDao) {
    try {
      const result = await this._usersModel.updateOne({ _id: userId }, dto);

      if (result.matchedCount === 0) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Email already exists');
      }
      rethrow(error);
    }
  }

  private buildSearchCondition(searchKey?: string) {
    return searchKey
      ? {
          $or: [
            { name: new RegExp(searchKey, 'i') },
            { lastname: new RegExp(searchKey, 'i') },
            { email: new RegExp(searchKey, 'i') },
          ],
          isActive: true,
        }
      : {
          isActive: true,
        };
  }

  private async getUsersWithPagination(
    query: PaginationParamsDto,
    condition: any = {},
  ) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;
    const totalCount = await this._usersModel.countDocuments(condition);
    const totalPages = Math.ceil(totalCount / pageSize);

    const users = await this.fetchUsers(condition, skip, pageSize);

    if (users.length <= 0) {
      throw new NotFoundException('Users not found');
    }

    return UsersMapper.mapToUsersPaginated(
      users,
      totalPages,
      page < totalPages,
      page > 1,
      page,
      pageSize,
    );
  }

  private async getUsersWithoutPagination(condition: any = {}) {
    const users = await this.fetchUsers(condition);
    if (users.length <= 0) {
      throw new NotFoundException('Users not found');
    }

    const usersMapped = users.map((user) =>
      UsersMapper.mapUserModelToGetUserDao(user),
    );

    return usersMapped;
  }

  private async fetchUsers(condition: any, skip?: number, limit?: number) {
    const query = this._usersModel.find(condition);
    if (skip != null && limit != null) {
      query.skip(skip).limit(limit);
    }
    return query.exec();
  }

  async findUsers(query: PaginationParamsDto) {
    try {
      const condition = this.buildSearchCondition(query.searchKey);

      if (query.page && query.pageSize) {
        return await this.getUsersWithPagination(query, condition);
      } else {
        return await this.getUsersWithoutPagination(condition);
      }
    } catch (error) {
      rethrow(error);
    }
  }

  async updateUsersMe(userId: string, dto: EditUsersMeDto) {
    try {
      const result = await this._usersModel.updateOne({ _id: userId }, dto);

      if (result.matchedCount === 0) {
        throw new NotFoundException('User not found');
      }

      return;
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }
}
