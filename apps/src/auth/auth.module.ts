import { CacheModule } from '@nestjs/cache-manager';
import { Module,   } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisConfig } from "config/redis/redis.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RedisCacheService } from "config/redis/redis.cache";
import { Apps } from "lib/src/enum/apps.enum";
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';

const configService = new ConfigService();
const redisConfig = new RedisConfig();
@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			publicKey: configService.get<string>('JWT_PUBLIC_AUTH_KEY').replace(/\\n/g, '\n'),
			privateKey: configService.get<string>('JWT_PRIVATE_AUTH_KEY').replace(/\\n/g, '\n'),
			signOptions: {
				expiresIn: Number(configService.get('JWT_TOKEN_EXPIRATION_TIME'))
			}
		}),
		UserModule,
		TypeOrmModule.forFeature([UserRepository]),
		CacheModule.register(redisConfig.getCacheOptions(Apps.USER))
	],
	controllers: [AuthController],
	providers: [AuthService, RedisCacheService, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}