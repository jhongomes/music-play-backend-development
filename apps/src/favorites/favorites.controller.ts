import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateMusicDto } from "lib/src/dto/apps/music/create-music.dto";
import { ResponseTypeDto } from "lib/src/general";
import { Favorites } from "./entity/favorites.entity";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteMusicDto } from "lib/src/dto/favorites/create-music-favorite.dto";

@ApiTags('Favorites')
@Controller('favorites')
@UseGuards(AuthGuard())
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{ access_token }}',
    required: true
})
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateFavoriteMusicDto })
    @ApiCreatedResponse({ type: Favorites, description: 'The Favorite has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createFavorites(@Body() data: CreateFavoriteMusicDto): Promise<ResponseTypeDto> {
        try {
            return this.favoritesService.createFavorites(data);
        } catch (error) {
            throw error;
        }
    }
}