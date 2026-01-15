import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateAlbumDto {
    @ApiProperty({ type: 'string', minLength: 3, maxLength: 30 })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title: string;

    @ApiProperty({ type: 'string', maxLength: 4 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(4)
    year_release: string;

    @ApiProperty({ type: 'string', required: false })
    @IsString()
    @IsOptional()
    photo: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    artist_id?: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}