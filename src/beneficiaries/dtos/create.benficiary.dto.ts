import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseIdDto } from 'src/utils/shared/dtos/base.id.dto';
import { CreateMedicalHistoryDto } from './create.medical.history.dto';

export class CreateParentDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Pablo',
    type: 'string',
    description: 'Name of parent',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    name: 'lastname',
    required: true,
    example: 'Perez',
    type: 'string',
    description: 'Lastname of parent',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  @ApiProperty({
    name: 'phoneNumber',
    required: true,
    example: '+34603412918',
    type: 'string',
    description: 'Phone number of parent',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;
}

export class CreateBenficiariesDto {
  @ApiProperty({
    name: 'name',
    required: true,
    example: 'Pablo',
    type: 'string',
    description: 'Name of beneficiary',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    name: 'lastname',
    required: true,
    example: 'Perez',
    type: 'string',
    description: 'Lastname of beneficiary',
  })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  @ApiProperty({
    name: 'birthday',
    required: true,
    example: '2000-01-01',
    type: 'date',
    description: 'Birthday of beneficiary',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly birthday: Date;

  @ApiProperty({
    name: 'isPlayingSports',
    required: true,
    example: true,
    type: 'boolean',
    description: 'Is the beneficiary playing sports?',
  })
  @IsNotEmpty()
  @IsBoolean()
  readonly isPlayingSports: boolean;

  @ApiProperty({
    name: 'gender',
    required: true,
    example: 'M',
    type: 'string',
    description: 'Gender of beneficiary',
  })
  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateParentDto)
  @ApiProperty({
    name: 'parent',
    required: true,
    example: {
      name: 'Pablo',
      lastname: 'Perez',
      phoneNumber: '+34603412918',
    },
    description: 'Parent of beneficiary',
  })
  readonly parent: CreateParentDto;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({
    name: 'medicalHistory',
    required: true,
    example: {
      height: 180,
      weight: 70,
      createdAt: '2020-01-01',
    },
    description: 'Medical history of beneficiary',
  })
  @Type(() => CreateMedicalHistoryDto)
  medicalHistory: CreateMedicalHistoryDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({
    name: 'alergies',
    required: true,
    example: `[{
            "id":"123e4567-e89b-12d3-a456-426614174000"
        }]`,
    description: 'Alergies of the user to be created',
  })
  @Type(() => BaseIdDto)
  alergies: BaseIdDto[];
}
