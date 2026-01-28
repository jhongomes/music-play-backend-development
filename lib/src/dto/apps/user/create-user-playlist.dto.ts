import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserPlayListDto {
    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @ApiProperty({ type: 'string' })
    @IsString()
    @IsNotEmpty()
    playlist_id: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}