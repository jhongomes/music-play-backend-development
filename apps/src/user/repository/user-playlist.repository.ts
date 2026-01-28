import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, MongoRepository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { DeleteResult, InsertOneResult, ObjectId } from 'mongodb';
import { UserPlaylist } from '../entity/user-playlist.entity';
import { CreateUserPlayListDto } from "lib/src/dto/apps/user/create-user-playlist.dto";
import { DeleteUserPlayListDto } from "lib/src/dto/apps/user/delete-user-playlist.dto";

@Injectable()
export class UserPlayListRepository {
    private readonly repository: MongoRepository<UserPlaylist>;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(UserPlaylist);
    }

    async addUserPlayList(data: CreateUserPlayListDto): Promise<InsertOneResult> {
        const userPlaylist = await this.repository.findOne({ where: { user_id: new ObjectId(data.user_id), playlist_id: new ObjectId(data.playlist_id) } });

        if (userPlaylist)
            throw new HttpException(
                `PlayList [${data.playlist_id}] already exists for the user [${data.user_id}]`,
                HttpStatus.BAD_REQUEST
            );

        return await this.repository.insertOne({
            user_id: new ObjectId(data.user_id),
            playlist_id: new ObjectId(data.playlist_id),
            createad_at: Date.now(),
            updated_at: Date.now(),
        });
    }

    async deleteUserPlayList(data: DeleteUserPlayListDto): Promise<DeleteResult> {
        return await this.repository.deleteOne({ user_id: new ObjectId(data.user_id), playlist_id: new ObjectId(data.playlist_id) });
    }
} 