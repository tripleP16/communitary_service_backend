import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({
    required: true,
    type: 'string',
    description: `User's email`,
    example: 'perez51160900@gmail.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    required: true,
    type: 'string',
    description: `User's password`,
    example: '123456Pp',
  })
  readonly password: string;
}
