import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetFavoritesDto {
	@ApiProperty({ type: 'string', required: true })
	@IsString()
	@IsNotEmpty()
	user_id: string;

	@ApiProperty({ type: 'string', required: true })
	@IsString()
	@IsNotEmpty()
	music_id: string;
}
