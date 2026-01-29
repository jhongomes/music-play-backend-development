import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ResponseTypeDto } from "lib/src/general";
import { FavoritesRepository } from "./repository/favorites.repository";
import { CreateFavoriteMusicDto } from "lib/src/dto/favorites/create-music-favorite.dto";
import { DeleteFavoriteMusicDto } from "lib/src/dto/favorites/delete-music-favorite.dto";
import { GetFavoritesDto } from "lib/src/dto/favorites/get-favorites.dtos";
import { ResponseFavoritesDto } from "lib/src/dto/favorites/response-get-favorites.dto";

@Injectable()
export class FavoritesService {
    constructor(private readonly favoritesRepository: FavoritesRepository) {}

    async createFavorites(data: CreateFavoriteMusicDto): Promise<ResponseTypeDto> {
        const foundFavoriteMusic = await this.favoritesRepository.countFavorites(data);

        if (foundFavoriteMusic)
            throw new HttpException(
                `The music [${data.music_id}] already exists in the favorites table.`,
                HttpStatus.BAD_REQUEST
            );

        const { acknowledged, insertedId } = await this.favoritesRepository.createFavorites(data);

        if (!acknowledged && !insertedId)
            throw new HttpException(
                `An error occurred while creating the music [${data.music_id}] in the favorites table.`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        Logger.log(`Favorite music [${data.music_id}] was successfully created`, 'CreateNewFavorites');

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Favorite Music was successfully created'
        }
    }

    async deleteMusicFavorites(data: DeleteFavoriteMusicDto): Promise<ResponseTypeDto> {
        const { deletedCount, acknowledged } = await this.favoritesRepository.deleteMusicFavorites(data);

        if (!acknowledged && deletedCount === 0)
            throw new HttpException(
                `An error occurred to delete the favorite music [${data.music_id}] for the user [${data.user_id}]`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )

        Logger.log(`Favorite music [${data.music_id}] was deleted successfully`, 'DeleteMusicFavorites');

        return {
            statusCode: HttpStatus.OK,
            message: 'Favorite Music deleted successfully'
        }
    }

    async getMusicFavorites(query: GetFavoritesDto): Promise<ResponseFavoritesDto> {
        return this.favoritesRepository.getMusicFavorites(query);
    }
}