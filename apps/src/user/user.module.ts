import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryConfig } from 'config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { Repository } from 'lib/src/enum/repositories.enum';
import { UserRepository } from './repository/user.repository';
import { ProfileModule } from '../profile/profile.module';

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Repository.USER)),
        HttpModule,
        ProfileModule
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule {}