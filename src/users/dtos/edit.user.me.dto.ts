import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EditUsersMeDto {
    @ApiProperty({
        required: true,
        type: String,
        description: 'Nuevo Nombre para el usuario',
        example: 'John Doe'
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Nuevo apellido para el usuario',
        example: 'Doe'
    })
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;

    @ApiProperty({
        required: true,
        type: String,
        description: 'Nuevo email para el usuario',
        example: 'john.doe@example.com'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;
}