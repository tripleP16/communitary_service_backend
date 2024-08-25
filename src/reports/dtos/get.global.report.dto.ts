import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ReportType } from "./enums/report.type.enum";

export class GetGlobalReportDto {
    @IsEnum(ReportType)
    @IsNotEmpty()
    @ApiProperty({ enum: ReportType, example: ReportType.bmi, required: true, description: 'Report type bmi, weight or height' })
    type: ReportType;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'true', required: true, description: 'Is yearly report' })
    isYearly: string;
}



export class GetGlobalReportDtoToService  {

    type: ReportType;


    isYearly: boolean;
}