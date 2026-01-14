import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { User } from "./entity/user.entity";
import { ResponseTypeDto } from "lib/src/general";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard())
@ApiHeader({
	name: 'Authorization',
	description: 'Bearer {{ access_token }}',
	required: true
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateNewUserDto })
  @ApiCreatedResponse({ type: User, description: 'The customer has been successfully created.' })
  @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
  @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
  async createUser(@Body() data: CreateNewUserDto): Promise<ResponseTypeDto> {
    try {
      return this.userService.createUser(data);
    } catch (error) {
      throw error;
    }
  }
}