import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

export class CreatePlaylistDto {
    @ApiProperty({ type: 'string', maxLength: 100 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    cover_art: string;

    @ApiProperty({ type: 'string', required: false, default: false })
    @IsOptional()
    @IsBoolean()
    isPublic = false

    @ApiProperty({ type: 'string' })
    @IsString()
    owner_id: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}