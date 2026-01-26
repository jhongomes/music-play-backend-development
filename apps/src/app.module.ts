import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { MusicModule } from './music/music.module';
import { UploadModule } from 'config/storage/storage.module';
import { RedisPubSubModule } from 'config/redis/ioredis/redis-pubsub.module';
@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
        RedisPubSubModule,
        UploadModule,
        UserModule,
        AuthModule,
        ProfileModule,
        AlbumModule,
        ArtistModule,
        MusicModule
    ],
    exports: [AuthModule, ConfigModule, UploadModule],
    providers: [],
})
export class AppModule {}