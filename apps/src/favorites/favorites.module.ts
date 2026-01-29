import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { FavoritesService } from "./favorites.service";
import { FavoritesRepository } from "./repository/favorites.repository";
import { FavoritesController } from "./favorites.controller";
import { Repository } from "lib/src/enum/repositories.enum";

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.FAVORITES))
    ],
    controllers: [FavoritesController],
    providers: [FavoritesService, FavoritesRepository],
    exports: [FavoritesService]
})
export class FavoritesModule {}