import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateAlergiesDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AlergiesDto)
  @ApiProperty({
    name: 'alergies',
    required: true,
    example: `[{
            "name":"Penicilina"
        }]`,
    description: 'Alergies of the user to be created',
  })
  readonly alergies: AlergiesDto[];
}

export class AlergiesDto {
  @ApiProperty({
    readOnly: true,
    type: 'string',
    description: 'Name of the alergies',
    example: 'Penicilina',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
