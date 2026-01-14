import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { DataSource, MongoRepository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateNewUserDto } from "lib/src/dto/apps/user/create-new-user.dto";
import { ExceptionObjectDto } from "lib/src/general/exceptions-object.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserCredentialsDto } from 'lib/src/dto/apps/user';
import { InsertOneResult } from 'mongodb';

@Injectable()
export class UserRepository {
    private readonly repository: MongoRepository<User>;

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getMongoRepository(User);
    }

    async createUser(data: CreateNewUserDto): Promise<InsertOneResult> {
        const currentUserStored = await this.findByEmail(data.email);

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
            created_at: Date.now(),
            updated_at: Date.now()
        });

        return insertResult;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email: email } });
    }

    async validatePassword(userCredentialsDto: UserCredentialsDto): Promise<string | null> {
		const { email, password } = userCredentialsDto;

		const user = await this.repository.findOne({ where: { email: email } });

		if (user && (await user.validatePassword(password))) {
			return user.email;
		}

		return null;
	}

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
} 