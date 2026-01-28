import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entity/user.entity";
import { ResponseTypeDto } from "lib/src/general";
import { CreateUserPlayListDto } from "lib/src/dto/apps/user/create-user-playlist.dto";
import { CreateNewUserDto } from "lib/src/dto/apps/user";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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

  @Post('/add-playlist')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
  @ApiBody({ type: CreateUserPlayListDto })
  @ApiCreatedResponse({ type: User, description: 'The PlaylistUser has been successfully created.' })
  @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
  @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
  async addUserPlayList(@Body() data: CreateUserPlayListDto): Promise<ResponseTypeDto> {
    try {
      return this.userService.addUserPlayList(data);
    } catch (error) {
      throw error;
    }
  }
}