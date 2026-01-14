import { Injectable } from "@nestjs/common";
import { ProfileRepository } from "./repository/profile.repository";
import { CreateProfileDto } from "lib/src/dto/apps/profile";
import { CreateNewUserDto } from "lib/src/dto/apps/user";

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {}

    async createProfile(data: CreateProfileDto, user_id: any): Promise<Partial<CreateNewUserDto>> {
       return await this.profileRepository.createProfile(data, user_id);
    }
}   