import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";
import { AccountType } from "lib/src/enum/account-type.enum";

export class CreateNewUserDto {
    @ApiProperty({ type: 'string', minLength: 11, maxLength: 50 })
    @IsNotEmpty()
    @IsString()
    @Length(11, 50)
    name: string;

    @ApiProperty({ type: 'string', maxLength: 255 })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    email: string;

    @ApiProperty({ type: 'string', minLength: 8, maxLength: 30 })
    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Weak password.' })
    password: string;

    @ApiProperty({ type: 'string', default: 'free' })
    @IsEnum(AccountType)
    @ValidateIf((obj: any) => {
        if (obj.account_type !== AccountType.FREE && obj.account_type !== AccountType.PREMIUM) throw new BadRequestException('Invalid pattern');
        return true;
    })
    account_type: string;

    @ApiProperty({ type: 'string', required: true, minLength: 10, maxLength: 10 })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    date_of_birth: string;

    @ApiProperty({ type: 'string', required: true })
    @IsString()
    @IsNotEmpty()
    genre: string;

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}