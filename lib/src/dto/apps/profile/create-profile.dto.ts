import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({ type: 'string', minLength: 11, maxLength: 50 })
    @IsNotEmpty()
    @IsString()
    @Length(11, 50)
    name: string;

    @ApiProperty({ type: 'string', maxLength: 255 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    email: string;

    @ApiProperty({ type: 'string', required: true, minLength: 8, maxLength: 10 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    date_of_birth: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    user_id?: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}