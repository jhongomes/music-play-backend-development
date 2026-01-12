import { Injectable } from "@nestjs/common";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { MusicEntity } from "apps/src/music/entity/music.entity";
import { UserEntity } from "apps/src/user/entity/user.entity";
import { Entitie } from "lib/enum/entities.enum";

@Injectable()
export class TypeormEntityConfig {
    public static getEntitiesOf(entities): EntityClassOrSchema[] {
        const entitiesOf = {
        [Entitie.USER]: () => [UserEntity],
        [Entitie.MUSIC]: () => [MusicEntity]
        };

        return entitiesOf[entities]();
    }
}