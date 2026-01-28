import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteUserPlayListDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    playlist_id: string;
}