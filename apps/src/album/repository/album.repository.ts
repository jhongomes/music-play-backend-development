import { DataSource, MongoRepository } from "typeorm";
import { Album } from "../entity/album.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { InsertOneResult } from "mongodb";

export class AlbumRepository {
    private readonly repository: MongoRepository<Album>
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Album);
    }

    async createAlbum(data: any): Promise<InsertOneResult> {
        return await this.repository.insertOne(data);
    }
}