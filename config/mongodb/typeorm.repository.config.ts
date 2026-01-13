import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Injectable } from "@nestjs/common";
import { Repository } from 'lib/src/enum/repositories.enum';
import { UserRepository } from 'apps/src/user/repository/user.repository';

@Injectable()
export class TypeOrmRepositoryConfig {
    public static getRepositoryOf(repositories: string): EntityClassOrSchema[] {
        const repositoriesOf = {
            [Repository.USER]: () => [UserRepository],
            [Repository.MUSIC]: () => []
        }

        return repositoriesOf[repositories]();
    }
}