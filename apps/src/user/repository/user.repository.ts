import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DataSource, MongoRepository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    private readonly repository: MongoRepository<User>;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(User);
    }

    async createUser(data: CreateNewUserDto): Promise<object> {
        const currentUserStored = await this.repository.findOne({ where: { email: data.email } });

        if (currentUserStored)
            throw new HttpException(
                ExceptionObjectDto.generate(
                    HttpStatus.BAD_REQUEST,
                    `User already exists [${data.email}]`
                ),
                HttpStatus.BAD_REQUEST
            );

        const user = new User();
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(data.password, user.salt);

        const insertResult = await this.repository.insertOne({
            name: data.name,
            email: data.email,
            password: user.password,
            salt: user.salt,
            account_type: data.account_type,
            create_date: Date.now(),
            create_time: Date.now()
        });

        return insertResult;
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
} 