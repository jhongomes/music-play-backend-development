import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmRepositoryConfig } from 'config';
import { UserService } from './user.service';
import { Entitie } from 'lib/enum/entities.enum';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature(TypeOrmRepositoryConfig.getRepositoryOf(Entitie.USER)),
        HttpModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}