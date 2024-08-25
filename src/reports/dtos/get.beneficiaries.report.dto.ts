import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { ReportType } from './enums/report.type.enum';
class IsArrayOfStrings {
  validate(value: any) {
    if (typeof value === 'string') {
      const arr = value.split(',');
      return arr.every(
        (item) => typeof item === 'string' && item.trim() !== '',
      );
    }
    return false;
  }

  defaultMessage() {
    return 'beneficiariesIds must be a comma-separated string of IDs';
  }
}

export class GetBeneficiariesReportDto {
  @IsEnum(ReportType)
  @IsNotEmpty()
  @ApiProperty({
    enum: ReportType,
    example: ReportType.bmi,
    required: true,
    description: 'Report type bmi, weight or height',
  })
  type: ReportType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'true',
    required: true,
    description: 'Is yearly report',
  })
  isYearly: string;

  @IsNotEmpty()
  @ApiProperty({
    example: ['60d1c4b1b5c3f7001b2d2f0e', '60d1c4b1b5c3f7001b2d2f0f'],
    required: true,
    description: 'Beneficiaries ids',
  })
  @IsNotEmpty()
  @Validate(IsArrayOfStrings)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  beneficiariesIds: string[];
}

export class GetBeneficiariesReportDtoToService {
  type: ReportType;

  isYearly: boolean;

  beneficiariesIds: string[];
}
