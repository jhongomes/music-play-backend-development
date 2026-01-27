import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, MongoRepository } from "typeorm";
import { PlaylistMusic } from "../entity/playlist-music.entity";
import { InsertOneResult, ObjectId } from "mongodb";
import { AddMusicToPlaylistDto } from "lib/src/dto/apps/playlist/add-music-to-playlist.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export class PlaylistMusicRepository {
    private readonly repository: MongoRepository<PlaylistMusic>
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(PlaylistMusic);
    }

    async findByOnePlaylist(playlist_id: string): Promise<any> {
        return ((await this.repository.find({ playlist_id: playlist_id })).sort(order => order.order - 1));
    }

    async AddMusicToPlaylist(playlist_id: string, music_id: AddMusicToPlaylistDto, order: number): Promise<InsertOneResult> {
        const musicPlayListAlreadyExists = await this.repository.count({ playlist_id: playlist_id, music_id: new ObjectId(music_id.music_id) });

        if (musicPlayListAlreadyExists)
            throw new HttpException(
                `Music [${music_id.music_id}] already exists in playlist [${playlist_id}]`,
                HttpStatus.BAD_REQUEST
            );

        return this.repository.insertOne({ playlist_id: playlist_id, music_id: new ObjectId(music_id.music_id), order: order, added_at: Date.now() });
    }
}