import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'The old password of the user',
    required: true,
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'The new password of the user',
    required: true,
    example: 'newpassword456',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
