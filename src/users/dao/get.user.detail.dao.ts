export class GetUserDetailDao {
    readonly id: string;
    readonly name: string;
    readonly lastname: string;
    readonly email: string;
    readonly privileges: GetPrivilegesDao[];

}

export class GetPrivilegesDao {
    readonly id: string;
    readonly name: string;
}