import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateArtistDto } from "lib/src/dto/apps/artist/create-artist.dto";
import { ArtistRepository } from "./repository/artist.repository";
import { ResponseTypeDto } from "lib/src/general";
import { ResponseGetArtistDto } from "lib/src/dto/apps/artist/response-get-album.dto";
import { GetArtistDto } from "lib/src/dto/apps/artist/get-artist.dtos";

@Injectable()
export class ArtistService {
    constructor(private readonly artistRepository: ArtistRepository) { }

    async createArtist(data: CreateArtistDto): Promise<ResponseTypeDto> {
        const artistAlreadyExists = await this.artistRepository.findByNameArtist(data.name);

        if (artistAlreadyExists)
            throw new HttpException(
                `Artist already exists [${data.name}]`,
                HttpStatus.BAD_REQUEST
            );

        const artistCreated = await this.artistRepository.createArtist(data);

        if (!artistCreated)
            throw new HttpException(
                `An error occurred to create the album [${data.name}]`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        Logger.log(`Artist [${data.name}] was successfully created`, 'CreateNewArtist');

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Artist was successfully created'
        };
    }

    async getArtist(query: GetArtistDto): Promise<ResponseGetArtistDto> {
        return this.artistRepository.getArtist(query);
    }
}