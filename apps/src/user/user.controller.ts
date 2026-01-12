import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController initialized');
  }
  
  @Get()
  teste() {
    return this.userService.teste();
  }
}