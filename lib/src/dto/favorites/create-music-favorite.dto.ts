import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteMusicDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    music_id: string;
}