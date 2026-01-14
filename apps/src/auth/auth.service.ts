import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccessTokenDto } from "lib/src/dto/apps/auth/access-token.dto";
import { UserCredentialsDto } from "lib/src/dto/apps/user";
import { UserRepository } from "../user/repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { RedisCacheService } from "config/redis/redis.cache";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
		protected configService: ConfigService,
		@Inject(UserRepository)
		private readonly userRepository: UserRepository,
		private jwtService: JwtService,
		private redisCacheService: RedisCacheService
	) {}
    async getAccessToken(userCredentialsDto: UserCredentialsDto): Promise<AccessTokenDto> {
        const email = await this.userRepository.validatePassword(userCredentialsDto);
        const expirationTime = this.configService.get<string>('JWT_TOKEN_EXPIRATION_TIME');
        
        const expiresIn = (new Date().getTime() + parseInt(expirationTime) * 1000).toString();

        if (!email) {
			throw new UnauthorizedException('Invalid credentials.');
		}

        const cache = await this.redisCacheService.getCacheByKey(email);

		if (cache && cache.accessToken) {
			return {
				accessToken: cache.accessToken,
				expiresIn: cache.expiresIn
			};
		}

        const payload = { email };

        const accessToken = this.jwtService.sign(payload, {
			secret: this.configService.get<string>('JWT_PRIVATE_AUTH_KEY').replace(/\\n/g, '\n'),
			algorithm: 'RS256'
		});

        await this.redisCacheService.setCache(email, { accessToken, expiresIn }, expirationTime);

		return {
			accessToken,
			expiresIn
		};

        return
    }
}