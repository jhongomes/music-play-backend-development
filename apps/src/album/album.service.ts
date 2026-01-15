import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AlbumRepository } from "./repository/album.repository";
import { ExceptionObjectDto, ResponseTypeDto } from "lib/src/general";
import { CreateAlbumDto } from "lib/src/dto/apps/album/album.dto";
import { GetAlbumDto } from "lib/src/dto/apps/album/get-album.dtos";
import { ResponseGetAlbumDto } from "lib/src/dto/apps/album/response-get-album.dto";

@Injectable()
export class AlbumService {
    constructor(private readonly albumRepository: AlbumRepository) {}

    async createAlbum(data: CreateAlbumDto): Promise<ResponseTypeDto> {
        const albumCreated = await this.albumRepository.createAlbum(data);

        if (!albumCreated)
            throw new HttpException(
                ExceptionObjectDto.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    `An error occurred to create the album [${data.title}]`
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        Logger.log(`Album [${data.title}] was successfully created`, 'CreateNewAlbum');

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Album was successfully created'
        };
    }

    async getAlbums(query: GetAlbumDto): Promise<ResponseGetAlbumDto> {
        return this.albumRepository.getAlbums(query);
    }
}