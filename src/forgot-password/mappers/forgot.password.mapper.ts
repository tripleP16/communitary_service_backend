import { CodeEntity } from '../entities/code.entity';
import { CreateCodeDto } from '../dtos/create.code.dto';

export class ForgotPasswordMapper {
  static fromEntityToDao(entity: CodeEntity) {
    return {
      code: entity.code,
      email: entity.email,
      expiresAt: entity.expiresAt,
    };
  }

  static fromDtoToDao(dto: CreateCodeDto, code: string, expiresAt: Date) {
    return {
      code: code,
      email: dto.email,
      expiresAt: expiresAt,
    };
  }
}
