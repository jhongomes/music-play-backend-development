import { InjectDataSource } from "@nestjs/typeorm";
import { CreateArtistDto } from "lib/src/dto/apps/artist/create-artist.dto";
import { InsertOneResult } from "mongodb";
import { DataSource, MongoRepository } from "typeorm";
import { Artist } from "../entity/artist.entity";

export class ArtistRepository {
    private readonly repository: MongoRepository<Artist>

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Artist);
    }

    async createArtist(data: CreateArtistDto): Promise<InsertOneResult> {
        return await this.repository.insertOne({
            name: data.name,
            bio: data.bio || '',
            created_at: Date.now(),
            updated_at: Date.now()
        });
    }

    async findByNameArtist(name: string): Promise<Artist | null> {
        return await this.repository.findOne({ where: { name: name } });
    }
}