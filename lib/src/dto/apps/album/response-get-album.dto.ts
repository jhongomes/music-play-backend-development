import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'apps/src/album/entity/album.entity';

export class ResponseGetAlbumDto {
	@ApiProperty({ type: [Album] })
	albums: Album[];

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
