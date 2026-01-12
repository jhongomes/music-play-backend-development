import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Injectable } from "@nestjs/common";
import { Repository } from 'lib/enum/repositories.enum';

@Injectable()
export class TypeOrmRepositoryConfig {
    public static getRepositoryOf(repositories: string): EntityClassOrSchema[] {
        const repositoriesOf = {
            [Repository.USER]: () => [],
            [Repository.MUSIC]: () => []
        }

        return repositoriesOf[repositories]();
    }
}