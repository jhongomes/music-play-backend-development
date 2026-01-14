import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmRepositoryConfig } from "config";
import { Repository } from "lib/src/enum/repositories.enum";
import { ProfileService } from "./profile.service";
import { ProfileRepository } from "./repository/profile.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.PROFILE))
    ],
    controllers: [],
    providers: [ProfileService, ProfileRepository],
    exports: [ProfileService, ProfileRepository]
})
export class ProfileModule {}