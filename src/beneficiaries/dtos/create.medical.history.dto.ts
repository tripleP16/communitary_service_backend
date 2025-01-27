import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicalHistoryDto {
  @ApiProperty({
    name: 'height',
    required: true,
    example: 170,
    type: 'number',
    description: 'Height in centimeters',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  readonly height: number;

  @ApiProperty({
    name: 'weight',
    required: true,
    example: 70,
    type: 'number',
    description: 'Weight in kilograms',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @ApiProperty({
    name: 'createdAt',
    required: true,
    example: '2024-01-01',
    type: 'date',
    description: 'Date of creation of the medical history',
  })
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;
}

export class CreateMedicalHistoryDtoToService {
  _id: string;
  height: number;
  weight: number;
  createdAt: Date;
}
