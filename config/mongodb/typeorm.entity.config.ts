import { Injectable } from "@nestjs/common";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Music } from "apps/src/music/entity/music.entity";
import { Profile } from "apps/src/profile/entity/profile.entity";
import { User } from "apps/src/user/entity/user.entity";
import { Entitie } from "lib/src/enum/entities.enum";

@Injectable()
export class TypeormEntityConfig {
    public static getEntitiesOf(entities): EntityClassOrSchema[] {
        const entitiesOf = {
        [Entitie.USER]: () => [User],
        [Entitie.MUSIC]: () => [Music],
        [Entitie.PROFILE]: () => [Profile]
        };

        return entitiesOf[entities]();
    }
}