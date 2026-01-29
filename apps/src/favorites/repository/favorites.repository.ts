import { DataSource, MongoRepository } from "typeorm";
import { Favorites } from "../entity/favorites.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DeleteResult, InsertOneResult, ObjectId } from "mongodb";
import { CreateFavoriteMusicDto } from "lib/src/dto/favorites/create-music-favorite.dto";
import { DeleteFavoriteMusicDto } from "lib/src/dto/favorites/delete-music-favorite.dto";

export class FavoritesRepository {
    private readonly repository: MongoRepository<Favorites>

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Favorites);
    }

    async createFavorites(data: CreateFavoriteMusicDto): Promise<InsertOneResult> {
        return await this.repository.insertOne({
            user_id: new ObjectId(data.user_id),
            music_id: new ObjectId(data.music_id),
            created_at: Date.now(),
            updated_at: Date.now()
        });
    }

    async countFavorites(data: CreateFavoriteMusicDto): Promise<number> {
        return await this.repository.count({ user_id: new ObjectId(data.user_id), music_id: new ObjectId(data.music_id) });
    }

    async deleteMusicFavorites(data: DeleteFavoriteMusicDto): Promise<DeleteResult> {
        return await this.repository.deleteOne({ user_id: new ObjectId(data.user_id), music_id: new ObjectId(data.music_id) });
    }
}