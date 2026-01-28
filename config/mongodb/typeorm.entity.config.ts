import { Injectable } from "@nestjs/common";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Album } from "apps/src/album/entity/album.entity";
import { Artist } from "apps/src/artist/entity/artist.entity";
import { Music } from "apps/src/music/entity/music.entity";
import { PlaylistMusic } from "apps/src/playlist/entity/playlist-music.entity";
import { Playlist } from "apps/src/playlist/entity/playlist.entity";
import { Profile } from "apps/src/profile/entity/profile.entity";
import { UserPlaylist } from "apps/src/user/entity/user-playlist.entity";
import { User } from "apps/src/user/entity/user.entity";
import { Entitie } from "lib/src/enum/entities.enum";

@Injectable()
export class TypeormEntityConfig {
    public static getEntitiesOf(entities): EntityClassOrSchema[] {
        const entitiesOf = {
            [Entitie.USER]: () => [User],
            [Entitie.MUSIC]: () => [Music],
            [Entitie.PROFILE]: () => [Profile],
            [Entitie.ALBUM]: () => [Album],
            [Entitie.ARTIST]: () => [Artist],
            [Entitie.PLAYLIST]: () => [Playlist],
            [Entitie.PLAYLIST_MUSIC]: () => [PlaylistMusic],
            [Entitie.USER_PLAYLIST]: () => [UserPlaylist]
        };

        return entitiesOf[entities]();
    }
}