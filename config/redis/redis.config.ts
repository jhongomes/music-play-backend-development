import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { Apps } from "lib/src/enum/apps.enum";
import { AppsType } from "lib/src/type/apps.type";

export class RedisConfig {
    private scheme: string;
    private messageBrokerUrl: string;
    private cacheUrl: string;
    private port: string;
    private envVariables: ConfigService;

    constructor() {
        this.envVariables = new ConfigService();
        this.setVariables();
    }

    public setVariables() {
        this.scheme = 'redis';
        this.port = this.envVariables.get('REDIS_URL').split('//')[1].split(':')[1];
        this.messageBrokerUrl = this.envVariables.get('REDIS_URL');
        this.cacheUrl = this.envVariables.get('REDIS_URL').split('//')[1].split(':')[0];
    }

    public getScheme(): string {
        return this.scheme;
    }

    public getPort(): string {
        return this.port;
    }

    public getMessageBrokerUrl(): string {
        return this.messageBrokerUrl;
    }

    public getCacheUrl(): string {
        return this.cacheUrl;
    }

    public getCacheOptions(apps?: AppsType): any {
        const cacheOptions = {
            [Apps.USER]: () => ({
                ttl: Number(this.envVariables.get('JWT_TOKEN_EXPIRATION_TIME')),
                max: 1,
                store: redisStore,
                host: this.cacheUrl,
                port: this.port
            }),

            default: () => ({
                ttl: 3600000,
                max: 1,
                store: redisStore,
                host: this.cacheUrl,
                port: this.port
            })
        };

        return apps in cacheOptions ? cacheOptions[apps]() : cacheOptions['default']();
    }
}