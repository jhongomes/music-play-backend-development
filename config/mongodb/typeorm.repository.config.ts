import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Injectable } from "@nestjs/common";
import { Repository } from 'lib/src/enum/repositories.enum';
import { UserRepository } from 'apps/src/user/repository/user.repository';
import { ProfileRepository } from 'apps/src/profile/repository/profile.repository';
import { AlbumRepository } from 'apps/src/album/repository/album.repository';
import { ArtistRepository } from 'apps/src/artist/repository/artist.repository';
import { MusicRepository } from 'apps/src/music/repository/music.repository';
import { PlaylistRepository } from 'apps/src/playlist/repository/playlist.repository';
import { PlaylistMusicRepository } from 'apps/src/playlist/repository/playlist-music.repository';
import { UserPlayListRepository } from 'apps/src/user/repository/user-playlist.repository';

@Injectable()
export class TypeOrmRepositoryConfig {
    public static getRepositoryOf(repositories: string): EntityClassOrSchema[] {
        const repositoriesOf = {
            [Repository.USER]: () => [UserRepository],
            [Repository.PROFILE]: () => [ProfileRepository],
            [Repository.ALBUM]: () => [AlbumRepository],
            [Repository.ARTIST]: () => [ArtistRepository],
            [Repository.MUSIC]: () => [MusicRepository],
            [Repository.PLAYLIST]: () => [PlaylistRepository],
            [Repository.PLAYLIST_MUSIC]: () => [PlaylistMusicRepository],
            [Repository.USER_PLAYLIST]: () => [UserPlayListRepository]
        }

        return repositoriesOf[repositories]();
    }
}