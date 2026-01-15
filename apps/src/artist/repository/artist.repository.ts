import { InjectDataSource } from "@nestjs/typeorm";
import { CreateArtistDto } from "lib/src/dto/apps/artist/create-artist.dto";
import { InsertOneResult } from "mongodb";
import { DataSource, MongoRepository } from "typeorm";
import { Artist } from "../entity/artist.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

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

    async getArtist(query: any): Promise<any> {
        const page = Number(query.page);
        delete query.page;
        const limit = Number(query.limit);
        delete query.limit;

        const totalFound = await this.repository.count(query);

        if (totalFound <= 0 || page > Math.ceil(totalFound / limit))
            return {
                artists: [],
                pagging: {
                    page,
                    limit,
                    totalFound
                }
            };

        const artists = await this.repository.aggregate([{ $match: query }, { $skip: limit * (page - 1) }, { $limit: limit }]).toArray();

        if (artists.length <= 0)
            throw new HttpException('No records found with these parameters.', HttpStatus.NOT_FOUND);

        return {
            artists,
            pagging: {
                page,
                limit,
                totalFound
            }
        };
    }
}