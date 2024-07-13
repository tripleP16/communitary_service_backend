import { PaginatedResultDao } from "src/utils/shared/api/dao/pagination.dao";
import { GetUserDao } from "../dao/get.user.dao";
import { Users } from "../entities/users.entity";

export class UsersMapper {
    static mapToUsersPaginated(
        users: Users[],
        totalPages: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        currentPage: number,
        pageSize: number,
    ): PaginatedResultDao<GetUserDao> {

        return {
            data: users.map((u) => UsersMapper.mapUserModelToGetUserDao(u)),
            totalPages: totalPages,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            currentPage: currentPage,
            pageSize: pageSize,
        }
    }


    static mapUserModelToGetUserDao(user: Users): GetUserDao {
        return {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
        };
    }
}