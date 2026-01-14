import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
        UserModule,
        AuthModule,
        ProfileModule
    ],
    exports: [AuthModule, ConfigModule],
    providers: [],
})
export class AppModule {}