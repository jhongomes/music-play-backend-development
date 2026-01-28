import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";
import { ResponseTypeDto } from "lib/src/general";
import { ProfileService } from "../profile/profile.service";
import { UserPlayListRepository } from "./repository/user-playlist.repository";
import { CreateUserPlayListDto } from "lib/src/dto/apps/user/create-user-playlist.dto";
import { DeleteUserPlayListDto } from "lib/src/dto/apps/user/delete-user-playlist.dto";

@Injectable()
export class UserService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly profileService: ProfileService,
      private readonly userPlayListRepository: UserPlayListRepository) { }

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

   async addUserPlayList(data: CreateUserPlayListDto): Promise<ResponseTypeDto> {
      const { acknowledged, insertedId } = await this.userPlayListRepository.addUserPlayList(data);

      if (!acknowledged && !insertedId)
         throw new HttpException(
            `An error occurred to create the user PlayList [${data.playlist_id}] for the user [${data.user_id}]`,
            HttpStatus.INTERNAL_SERVER_ERROR
         )

      Logger.log(`User PlayList [${data.playlist_id}] was created successfully`, 'createNewUserPlayList');

      return {
         statusCode: HttpStatus.CREATED,
         message: 'User PlayList created successfully'
      }
   }

   async deleteUserPlayList(data: DeleteUserPlayListDto): Promise<ResponseTypeDto> {
      const { deletedCount, acknowledged } = await this.userPlayListRepository.deleteUserPlayList(data);

      if (!acknowledged && deletedCount === 0)
         throw new HttpException(
            `An error occurred to delete the user PlayList [${data.playlist_id}] for the user [${data.user_id}]`,
            HttpStatus.INTERNAL_SERVER_ERROR
         )

      Logger.log(`User PlayList [${data.playlist_id}] was deleted successfully`, 'deleteUserPlayList');

      return {
         statusCode: HttpStatus.OK,
         message: 'User PlayList deleted successfully'
      }
   }
} 