import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { User } from "./entity/user.entity";
import { ResponseTypeDto } from "lib/src/general";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
  @ApiBody({ type: CreateNewUserDto })
  @ApiCreatedResponse({ type: User, description: 'The customer has been successfully created.' })
  @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
	@ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
  async createUser(@Body() data: CreateNewUserDto): Promise<ResponseTypeDto> {
    try {
      return this.userService.createUser(data);
    } catch (error) {
      throw error;
    }
  }
}