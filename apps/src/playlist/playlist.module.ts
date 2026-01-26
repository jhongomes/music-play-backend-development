import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { Repository } from "lib/src/enum/repositories.enum";
import { PlaylistService } from "./playlist.service";
import { PlaylistRepository } from "./repository/playlist.repository";
import { PlaylistController } from "./playlist.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.PLAYLIST))
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService, PlaylistRepository],
    exports: [PlaylistService]
})
export class PlayListModule {}