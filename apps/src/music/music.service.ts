import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MusicRepository } from "./repository/music.repository";
import { ResponseTypeDto } from "lib/src/general";
import { CreateMusicDto } from "lib/src/dto/apps/music/create-music.dto";

@Injectable()
export class MusicService {
    constructor(private readonly musicRepository: MusicRepository) {}

    async createMusic(data: CreateMusicDto): Promise<ResponseTypeDto> {
        const createdMusic = await this.musicRepository.createMusic(data);

        if (!createdMusic)
            throw new HttpException(
                `Ocorred on error to create the music [${data.title}]`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        Logger.log(`Music [${data.title}] was successfully created`, 'CreateNewMusic');

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Music was successfully created'
        }
    }
}