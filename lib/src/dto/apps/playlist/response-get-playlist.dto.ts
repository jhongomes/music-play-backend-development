import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'apps/src/playlist/entity/playlist.entity';

export class ResponseGetPlaylistDto {
	@ApiProperty({ type: [Playlist] })
	playlist: Playlist[];

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
