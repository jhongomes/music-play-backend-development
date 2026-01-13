import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
    constructor(@Inject('CACHE_MANAGER') private cache: Cache) {}

    public async deleteCache(key: string): Promise<void> {
		await this.cache.del(key);
	}

	public async setCache(key: string, value: any, ttl = null): Promise<void> {
		await this.cache.set(key, value, ttl);
	}

	public async getCacheByKey(key: string): Promise<any> {
		return this.cache.get(key);
	}
}