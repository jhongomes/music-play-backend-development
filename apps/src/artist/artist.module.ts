import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { Repository } from "lib/src/enum/repositories.enum";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistRepository } from "./repository/artist.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.ARTIST))
    ],
    controllers: [ArtistController],
    providers: [ArtistService, ArtistRepository],
    exports: [ArtistService]
})
export class ArtistModule {}