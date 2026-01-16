import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LimitMinMax, PageMin } from "lib/src/general/page-limit-validation";
import { ObjectId } from "mongodb";

export class GetAlbumDto {
	@ApiProperty({ type: 'string', default: 1, minimum: 1, required: false })
	@IsOptional()
	@IsNotEmpty()
	@PageMin(1, { message: 'page must be greater or equal to 1' })
	page = 1;

	@ApiProperty({ type: 'string', default: 10, minimum: 1, maximum: 50, required: false })
	@IsOptional()
	@IsNotEmpty()
	@LimitMinMax(1, 50, { message: 'limit must be greater or equal to 1 and lower or equal to 50' })
	limit = 10;

	@ApiProperty({ type: 'string', required: false })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ type: 'string', required: false })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	year_release: string;

    @ApiProperty({ type: 'string', required: false })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	artist_id: string | ObjectId;

	@ApiProperty({ type: 'number', required: false })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	created_at: number;

	@ApiProperty({ type: 'number', required: false })
	@IsString()
	@IsOptional()
	@IsNotEmpty()
	updated_at: number;
}
