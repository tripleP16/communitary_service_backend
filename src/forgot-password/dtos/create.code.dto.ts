import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email of the user',
    example: 'perez51160900@gmail.com',
    type: 'string',
    required: true,
  })
  readonly email: string;
}
