import { DataSource, MongoRepository } from "typeorm";
import { Music } from "../entity/music.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { InsertOneResult, ObjectId } from "mongodb";
import { CreateMusicDto } from "../../../../lib/src/dto/apps/music/create-music.dto";

export class MusicRepository {
    private readonly repository: MongoRepository<Music>

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Music);
    }

    async createMusic(data: CreateMusicDto): Promise<InsertOneResult> {
        const createdMusic = await this.repository.insertOne({
            title: data.title,
            artist_id: new ObjectId(data.artist_id),
            album_id: new ObjectId(data.album_id),
            user_id: new ObjectId(data.user_id),
            duration: data.duration,
            genre: data.genre,
            sound_url: data.sound_url,
            cover_art: data.cover_art,    
            created_at: Date.now(),
            updated_at: Date.now()
        });

        return createdMusic;
    }
}