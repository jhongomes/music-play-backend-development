import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateNewUserDto })
  @ApiBadRequestResponse({ description: 'An error ocurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ description: 'An error ocurred. A message explaining will be notified.' })
  async createUser(@Body() data: CreateNewUserDto): Promise<void> {
    try {
      await this.userService.createUser(data);
    } catch (error) {
      throw error;
    }
  }
}