import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { MongodbConfig } from "./mongodb.config";
import { TypeormEntityConfig } from "./typeorm.entity.config";
import { Entitie } from "lib/src/enum/entities.enum";


@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
    private mongoConfig: MongodbConfig;

    constructor() {
        this.mongoConfig = new MongodbConfig();
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mongodb',
            url: this.mongoConfig.getUrl(),
            synchronize: true,
            logging: true,
            entities: [
                ...TypeormEntityConfig.getEntitiesOf(Entitie.USER),
                ...TypeormEntityConfig.getEntitiesOf(Entitie.MUSIC)
            ]
        };
    }
}