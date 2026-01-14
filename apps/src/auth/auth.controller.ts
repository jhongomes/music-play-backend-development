import { Body, Controller, Post } from "@nestjs/common";
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { ResponseTypeDto } from "lib/src/general";
import { AuthService } from "./auth.service";
import { AccessTokenDto } from "lib/src/dto/apps/auth/access-token.dto";
import { UserCredentialsDto } from "lib/src/dto/apps/user/user-credentials.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/getaccesstoken')
	@ApiProperty({ type: UserCredentialsDto, description: 'Given username and password registered, will be generated a new access token.' })
	@ApiOkResponse({ type: AccessTokenDto, description: 'Access granted' })
	@ApiForbiddenResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error occurred, a message explaining will be notified.' })
	async getAccessToken(@Body() userCredentialsDto: UserCredentialsDto): Promise<AccessTokenDto> {
		return this.authService.getAccessToken(userCredentialsDto);
	}
}