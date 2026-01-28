import { DataSource, MongoRepository } from "typeorm";
import { Playlist } from "../entity/playlist.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { DeleteResult, InsertOneResult, ObjectId } from "mongodb";
import { CreatePlaylistDto } from "lib/src/dto/apps/playlist/create-playlist.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseGetPlaylistDto } from "lib/src/dto/apps/playlist/response-get-playlist.dto";
import { GetPlayListDto } from "lib/src/dto/apps/playlist/get-playlist.dtos";

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

    async getAllPlayList(query: GetPlayListDto): Promise<ResponseGetPlaylistDto> {
        const page = Number(query.page);
        delete query.page;
        const limit = Number(query.limit);
        delete query.limit;

        if (query.owner_id) {
            query.owner_id = new ObjectId(query.owner_id);
        }

        const totalFound = await this.repository.count(query);

        if (totalFound <= 0 || page > Math.ceil(totalFound / limit))
            return {
                playlist: [],
                pagging: {
                    page,
                    limit,
                    totalFound
                }
            };

        const playlist = await this.repository.aggregate([{ $match: query }, { $skip: limit * (page - 1) }, { $limit: limit }]).toArray();

        if (playlist.length <= 0)
            throw new HttpException('No records found with these parameters.', HttpStatus.NOT_FOUND);

        return {
            playlist,
            pagging: {
                page,
                limit,
                totalFound
            }
        };
    }

    async getPlayListDetail(playlist_id: string): Promise<ResponseGetPlaylistDto[]> {
        const playList = await this.repository.aggregate([
            {
                $match: {
                    _id: new ObjectId(playlist_id),
                },
            },
            {
                $lookup: {
                    from: 'playlist_music',
                    let: {
                        playlistId: '$_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$playlist_id', '$$playlistId'],
                                },
                            },
                        },
                        {
                            $project: {
                                music_id: 1,
                                order: 1,
                            },
                        },
                    ],
                    as: 'playlist_music',
                },
            },
            {
                $lookup: {
                    from: 'music',
                    let: {
                        musicIds: '$playlist_music.music_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$musicIds'],
                                },
                            },
                        },
                        {
                            $project: {
                                title: 1,
                                sound_url: 1,
                                cover_art: 1,
                                duration: 1,
                            },
                        },
                    ],
                    as: 'musics',
                },
            },
            {
                $project: {
                    name: 1,
                    musics: {
                        $map: {
                            input: '$playlist_music',
                            as: 'pm',
                            in: {
                                $mergeObjects: [
                                    '$$pm',
                                    {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$musics',
                                                    as: 'm',
                                                    cond: { $eq: ['$$m._id', '$$pm.music_id'] },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                },
            }
        ]).toArray();

        return playList
    }

    async deletePlayList(playlist_id: string): Promise<DeleteResult> {
        return this.repository.deleteOne({ _id: new ObjectId(playlist_id) });
    }

    async countPlayList(playlist_id: string): Promise<number> {
        return this.repository.count({ _id: new ObjectId(playlist_id) });
    }
}