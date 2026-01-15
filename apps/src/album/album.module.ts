import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { Repository } from "lib/src/enum/repositories.enum";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { AlbumRepository } from "./repository/album.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.ALBUM))
    ],
    controllers: [AlbumController],
    providers: [AlbumService, AlbumRepository],
    exports: [AlbumService]
})
export class AlbumModule {}