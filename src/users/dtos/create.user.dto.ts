import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { BaseIdDto } from 'src/utils/shared/dtos/base.id.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Pablo',
    type: 'string',
    description: 'Name of the user to be created',
  })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'lastname',
    required: true,
    example: 'Perez',
    type: 'string',
    description: 'Lastname of the user to be created',
  })
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    required: true,
    example: 'test@mail.com',
    type: 'string',
    description: 'Email of the user to be created',
  })
  readonly email: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BaseIdDto)
  @ApiProperty({
    name: 'privileges',
    required: true,
    example: `[{
        "id":"123e4567-e89b-12d3-a456-426614174000"
    }]`,
    description: 'Privilege id from the entity privilege',
  })
  readonly privileges: BaseIdDto[];
}
