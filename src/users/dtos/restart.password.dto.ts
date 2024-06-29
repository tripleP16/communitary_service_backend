import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RestartPasswordDto {
  @ApiProperty({
    description: 'New password',
    example: 'password123',
    type: String,
    required: true,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly newPassword: string;
}
