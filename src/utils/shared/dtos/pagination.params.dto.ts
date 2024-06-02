import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @ApiProperty({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
    type: 'number',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly page: number;
  @ApiProperty({
    name: 'pageSize',
    required: false,
    example: 10,
    type: 'number',
    description: 'Page size',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  readonly pageSize: number;
  @ApiProperty({
    name: 'searchKey',
    required: false,
    example: 'test',
    type: 'string',
    description: 'Search key',
  })
  @Type(() => String)
  @IsOptional()
  readonly searchKey: string;
}
