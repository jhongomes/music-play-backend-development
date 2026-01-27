import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreatePlaylistDto } from "lib/src/dto/apps/playlist/create-playlist.dto";
import { ResponseTypeDto } from "lib/src/general";
import { PlaylistRepository } from "./repository/playlist.repository";
import { PlaylistMusicRepository } from "./repository/playlist-music.repository";
import { InsertOneResult } from "mongodb";
import { AddMusicToPlaylistDto } from "lib/src/dto/apps/playlist/add-music-to-playlist.dto";
import { ResponseGetPlaylistDto } from "lib/src/dto/apps/playlist/response-get-playlist.dto";
import { GetPlayListDto } from "lib/src/dto/apps/playlist/get-playlist.dtos";

@Injectable()
export class PlaylistService {
    constructor(
        private readonly playlistRepository: PlaylistRepository,
        private readonly playListMusicRepository: PlaylistMusicRepository) {}

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

    async AddMusicToPlaylist(playlist_id: string, music_id: AddMusicToPlaylistDto): Promise<InsertOneResult> {
        const foundPlayList = await this.playListMusicRepository.findByOnePlaylist(playlist_id);
        const order = foundPlayList.length ? foundPlayList[0].order + 1 : 1;

        if (!foundPlayList)
            throw new HttpException(
                `Not found PlayList [${playlist_id}]`,
                HttpStatus.NOT_FOUND
            );

        const addedMusicPlayList = await this.playListMusicRepository.AddMusicToPlaylist(playlist_id, music_id, order);

        if (!addedMusicPlayList)
            throw new HttpException(
                `Ocorred on error to add the music [${music_id}] to playlist [${playlist_id}]`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        Logger.log(`Music [${music_id.music_id}] was successfully added to playlist [${playlist_id}]`, 'AddMusicToPlaylist');

        return addedMusicPlayList;
    }

    async getAllPlayList(query: GetPlayListDto): Promise<ResponseGetPlaylistDto> {
        return this.playlistRepository.getAllPlayList(query);
    }

    async getPlayListDetail(playlist_id: string): Promise<ResponseGetPlaylistDto[]> {
        return this.playlistRepository.getPlayListDetail(playlist_id);
    }
}