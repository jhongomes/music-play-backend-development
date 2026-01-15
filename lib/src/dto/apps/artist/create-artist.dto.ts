import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateArtistDto {
    @ApiProperty({ type: 'string', minLength: 3, maxLength: 30 })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @ApiProperty({ type: 'string', maxLength: 200 })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    bio: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}