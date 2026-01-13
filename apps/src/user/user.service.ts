import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";

@Injectable()
export class UserService {
   constructor(private readonly userRepository: UserRepository) {}
   async createUser(data: CreateNewUserDto): Promise<void> {
      const userCreated = await this.userRepository.createUser(data);

      if (!userCreated)
         throw new HttpException(
            ExceptionObjectDto.generate(
               HttpStatus.INTERNAL_SERVER_ERROR,
               `An error occurred to create the user [${data.email}]`
            ),
            HttpStatus.INTERNAL_SERVER_ERROR
         );

      Logger.log(
         `User [${data.email}] - [${data.name}] was successfully created`,
         'CreateUser'
      );
   }
} 