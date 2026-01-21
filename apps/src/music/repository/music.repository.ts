import { BulkWriteResult, DataSource, MongoRepository } from "typeorm";
import { Music } from "../entity/music.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { InsertOneResult, ObjectId } from "mongodb";
import { CreateMusicDto } from "../../../../lib/src/dto/apps/music/create-music.dto";
import { Logger } from "@nestjs/common";

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

    async createBulkMusic(createMusicsDto: CreateMusicDto[]): Promise<{ bulkOperationResult: BulkWriteResult; bulkOperationsExecuted: CreateMusicDto[] }> {
        let bulkOperation = this.repository.initializeOrderedBulkOp();
        const bulkOperationsExecuted = [];

        for (const createMusicDto of createMusicsDto) {
            bulkOperation.insert({
                title: createMusicDto.title,
                artist_id: new ObjectId(createMusicDto.artist_id),
                album_id: new ObjectId(createMusicDto.album_id),
                user_id: new ObjectId(createMusicDto.user_id),
                duration: createMusicDto.duration,
                genre: createMusicDto.genre,
                sound_url: createMusicDto.sound_url,
                cover_art: createMusicDto.cover_art,
                created_at: Date.now(),
                updated_at: Date.now()
            });

            bulkOperationsExecuted.push(createMusicDto)
        }

        const bulkOperationResult = await bulkOperation.execute();

        Logger.log(
            `Bulk operations execution [${bulkOperationResult.ok ? true : false}] - Inserted [${bulkOperationResult.insertedCount
            }]`,
            'CreateBulkMusics'
        );

        bulkOperation = null;

        return {
            bulkOperationResult,
            bulkOperationsExecuted
        };
    }

    async getMusicById(id: string): Promise<Music | null> {
        return await this.repository.findOne({ where: { _id: new ObjectId(id) } })
    }
}