import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class AddMusicToPlaylistDto {
    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    music_id: string | ObjectId;
}
