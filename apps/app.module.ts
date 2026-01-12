
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {}