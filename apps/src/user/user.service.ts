import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";
import { ResponseTypeDto } from "lib/src/general";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class UserService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly profileService: ProfileService) {}
   async createUser(data: CreateNewUserDto): Promise<ResponseTypeDto> {
      const userCreated = await this.userRepository.createUser(data);
      const { insertedId } = userCreated;

      if (!userCreated)
         throw new HttpException(
            ExceptionObjectDto.generate(
               HttpStatus.INTERNAL_SERVER_ERROR,
               `An error occurred to create the user [${data.email}]`
            ),
            HttpStatus.INTERNAL_SERVER_ERROR
         );

      await this.profileService.createProfile(data, insertedId);

      Logger.log(`User [${data.email}] - [${data.name}] was successfully created`, 'CreateNewUser');

      return {
         statusCode: HttpStatus.CREATED,
         message: 'User created successfully'
      };
   }
} 