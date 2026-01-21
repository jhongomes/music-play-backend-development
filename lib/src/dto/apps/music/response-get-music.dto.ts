import { ApiProperty } from '@nestjs/swagger';
import { Music } from 'apps/src/music/entity/music.entity';

export class ResponseGetMusicDto {
	@ApiProperty({ type: [Music] })
	songs: Music[];

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
