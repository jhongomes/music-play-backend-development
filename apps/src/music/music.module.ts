import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { Repository } from "lib/src/enum/repositories.enum";
import { MusicController } from "./music.controller";
import { MusicService } from "./music.service";
import { MusicRepository } from "./repository/music.repository";
import { RedisPubSubModule } from "config/redis/ioredis/redis-pubsub.module";

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.MUSIC)),
        RedisPubSubModule
    ],
    controllers: [MusicController],
    providers: [MusicService, MusicRepository],
    exports: [MusicService]
})
export class MusicModule {}