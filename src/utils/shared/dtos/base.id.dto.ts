import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BaseIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    name: 'id',
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Basic id of project entity',
  })
  id: string;
}
