import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DataSource, MongoRepository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    private readonly repository: MongoRepository<UserEntity>;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(UserEntity);
    }

    async createUser(data: CreateNewUserDto) {
        const currentUserStored = await this.repository.findOne({ where: { email: data.email } });

        if (currentUserStored)
            throw new HttpException(
                ExceptionObjectDto.generate(
                    HttpStatus.BAD_REQUEST,
                    `User already exists [${data.email}]`
                ),
                HttpStatus.BAD_REQUEST
            );

        const insertResult = await this.repository.insert({
            name: data.name,
            email: data.email,
            password: data.password,
            account_type: (data.account_type as any) as string,
            create_date: Date.now(),
            create_time: Date.now()
        });

        if (!insertResult)
            throw new HttpException(
                ExceptionObjectDto.generate(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    `An error occurred to create the user [${data.email}]`
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        return {
            email: data.email,
            name: data.name
        }
    }
} 