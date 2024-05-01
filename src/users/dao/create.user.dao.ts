export class CreateUserDao {
  readonly _id: string;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly privileges: string[];
  readonly isActive: boolean;
  readonly password: string;
}
