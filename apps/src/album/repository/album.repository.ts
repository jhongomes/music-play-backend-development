import { DataSource, MongoRepository } from "typeorm";
import { Album } from "../entity/album.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { InsertOneResult, ObjectId } from "mongodb";
import { GetAlbumDto } from "lib/src/dto/apps/album/get-album.dtos";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseGetAlbumDto } from "lib/src/dto/apps/album/response-get-album.dto";
import { CreateAlbumDto } from "lib/src/dto/apps/album/album.dto";

export class AlbumRepository {
    private readonly repository: MongoRepository<Album>
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Album);
    }

    async createAlbum(data: CreateAlbumDto): Promise<InsertOneResult> {
        return await this.repository.insertOne({
            title: data.title,
            year_release: data.year_release,
            photo: data.photo || '',
            artist_id: new ObjectId(data.artist_id),
            created_at: Date.now(),
            updated_at: Date.now()
        });
    }

    async getAlbums(query: GetAlbumDto): Promise<ResponseGetAlbumDto> {
        const page = Number(query.page);
        delete query.page;
        const limit = Number(query.limit);
        delete query.limit;

        if (query.artist_id) {
            query.artist_id = new ObjectId(query.artist_id);
        }

        const totalFound = await this.repository.count(query);

        if (totalFound <= 0 || page > Math.ceil(totalFound / limit))
            return {
                albums: [],
                pagging: {
                    page,
                    limit,
                    totalFound
                }
            };

        const albums = await this.repository.aggregate([{ $match: query }, { $skip: limit * (page - 1) }, { $limit: limit }]).toArray();

        if (albums.length <= 0)
            throw new HttpException('No records found with these parameters.', HttpStatus.NOT_FOUND);

        return {
            albums,
            pagging: {
                page,
                limit,
                totalFound
            }
        };
    }
}