import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateMusicDto {
    @ApiProperty({ type: 'string', maxLength: 30 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    title: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    @IsString()
    album_id: string | ObjectId;

    @ApiProperty({ type: 'string', required: false })
    @IsNotEmpty()
    @IsString()
    user_id: string | ObjectId;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    artist_id: string | ObjectId;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    genre: string;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    duration: string;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    sound_url: string;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    cover_art: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}