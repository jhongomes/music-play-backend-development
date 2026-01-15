import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'apps/src/artist/entity/artist.entity';

export class ResponseGetArtistDto {
	@ApiProperty({ type: [Artist] })
	artists: Artist[];

	@ApiProperty({
		type: 'object',
		example: {
			page: 'number',
			limit: 'number',
			totalFound: 'number'
		}
	})
	pagging: {
		page: number;
		limit: number;
		totalFound: number;
	};
}
