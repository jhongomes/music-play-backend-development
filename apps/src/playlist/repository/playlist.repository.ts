import { DataSource, MongoRepository } from "typeorm";
import { Playlist } from "../entity/playlist.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { InsertOneResult, ObjectId } from "mongodb";
import { CreatePlaylistDto } from "lib/src/dto/apps/playlist/create-playlist.dto";

export class PlaylistRepository {
    private readonly repository: MongoRepository<Playlist>
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Playlist);
    }

    async createPlaylist(data: CreatePlaylistDto): Promise<InsertOneResult> {
        const createdPlaylist = this.repository.insertOne({
            name: data.name,
            description: data.description,
            cover_art: data.cover_art,
            isPublic: data.isPublic,
            owner_id: new ObjectId(data.owner_id),
            created_at: Date.now(),
            updated_at: Date.now()
        });

        return createdPlaylist;
    }
}