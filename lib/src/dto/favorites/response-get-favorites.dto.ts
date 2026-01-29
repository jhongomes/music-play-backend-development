import { ApiProperty } from '@nestjs/swagger';
import { Favorites } from 'apps/src/favorites/entity/favorites.entity';

export class ResponseFavoritesDto {
	@ApiProperty({ type: [Favorites] })
	favorites: Favorites[];
}
