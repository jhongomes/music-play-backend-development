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

    async createBulkMusic(createMusicsDto: CreateMusicDto[]): Promise<ResponseTypeDto> {
        let { bulkOperationResult, bulkOperationsExecuted } = await this.musicRepository.createBulkMusic(createMusicsDto);

        if (bulkOperationsExecuted.length && (bulkOperationResult.insertedCount)) {
            for (const music of bulkOperationsExecuted) {
                Logger.log(
                    `Created music [Title: ${music.title}] - Genre: ${music.genre} - Duration: [${music.duration}] process finished`,
                    'CreateBulkMusic'
                );
            }
        }

        bulkOperationResult = null;
        bulkOperationsExecuted = null;
        createMusicsDto = null;

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Musics was successfully created'
        }
    }
}