import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreatePlaylistDto } from "lib/src/dto/apps/playlist/create-playlist.dto";
import { ResponseTypeDto } from "lib/src/general";
import { PlaylistRepository } from "./repository/playlist.repository";

@Injectable()
export class PlaylistService {
    constructor(private readonly playlistRepository: PlaylistRepository) { }

    async createPlayList(data: CreatePlaylistDto): Promise<ResponseTypeDto> {
        const createdPlaylist = await this.playlistRepository.createPlaylist(data);

        if (!createdPlaylist)
            throw new HttpException(
                `Ocorred on error to create the PlayList [${data.name}]`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        
        Logger.log(`PlayList [${data.name}] was successfully created`, 'CreateNewPlayList');

        return {
            statusCode: HttpStatus.CREATED,
            message: 'PlayList was successfully created'
        }
    }
}