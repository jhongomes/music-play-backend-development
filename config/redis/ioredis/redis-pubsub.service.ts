import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisPubSubService {
    private _pub?: Redis;
    private _sub?: Redis;

    constructor(private config: ConfigService) { }

    get pub(): Redis {
        if (!this._pub) {
            this._pub = new Redis(this.config.get('REDIS_URL'));
        }
        return this._pub;
    }

    get sub(): Redis {
        if (!this._sub) {
            this._sub = new Redis(this.config.get('REDIS_URL'));
        }
        return this._sub;
    }
}