import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'apps/src/user/repository/user.repository';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(protected configService: ConfigService, @Inject(UserRepository) private readonly userRepository: UserRepository) {
		super({
			secretOrKey: configService.get<string>('JWT_PUBLIC_AUTH_KEY').replace(/\\n/g, '\n'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			algorithms: ['RS256']
		});
	}

	async validate(payload: JwtPayload) {
		const { email } = payload;
		const emailStored = await this.userRepository.findByEmail(email);

		if (!emailStored) {
			throw new UnauthorizedException();
		}

		return emailStored;
	}
}
