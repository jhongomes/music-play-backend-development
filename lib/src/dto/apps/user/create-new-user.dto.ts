import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString, Length, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";

export class AccountType {
    @IsString()
    @IsNotEmpty()
    free: string;

    @IsString()
    @IsNotEmpty()
    premium: string;
}

export class CreateNewUserDto {
    @ApiProperty({ type: 'string',  minLength: 11, maxLength: 50})
    @IsNotEmpty()
    @IsString()
    @Length(11, 50)
    name: string;

    @ApiProperty({ type: 'string', maxLength: 255})
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
    @IsObject()
    @IsNotEmptyObject()
   	@ValidateNested()
    @Type(() => AccountType)
    account_type: AccountType;

    @ApiProperty({ type: 'string', minLength: 8, maxLength: 8 })
	@IsNotEmpty()
	@IsString()
	@Length(8, 8)
	create_date: string;

	@ApiProperty({ type: 'string', minLength: 6, maxLength: 6 })
	@IsNotEmpty()
	@IsString()
	@Length(6, 6)
	create_time: string;
}