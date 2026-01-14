import { DataSource, MongoRepository } from "typeorm";
import { Profile } from "../entity/profile.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateProfileDto } from "lib/src/dto/apps/profile";
import { CreateNewUserDto } from "lib/src/dto/apps/user";

export class ProfileRepository {
    private readonly repository: MongoRepository<Profile>;
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(Profile);
    }

    async createProfile(data: CreateProfileDto, user_id: any): Promise<Partial<CreateNewUserDto>> {
        const profileAlreadyExists = await this.repository.count({
            email: data.email
        });

        if (!profileAlreadyExists) {
            await this.repository.insertOne({
                name: data.name,
                email: data.email,
                date_of_birth: data.date_of_birth,
                genre: data.genre,
                user_id: user_id,
                created_at: Date.now(),
                updated_at: Date.now()
            })
            return;
        }

        await this.repository.updateOne({
            email: data.email
        }, {
            $set: {
                name: data.name,
                date_of_birth: data.date_of_birth,
                genre: data.genre,
                user_id: user_id,
                updated_at: Date.now()
            }
        });
    }
}