import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
        UserModule
    ],
    exports: [ ConfigModule],
    providers: [],
})
export class AppModule {}