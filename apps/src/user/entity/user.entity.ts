import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AccountType } from "lib/src/enum/account-type.enum";
@Entity()
export class User extends BaseEntity {
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    name: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    email: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    password: string;

    @ApiProperty({ type: 'string', required: true, enum: AccountType })
    @Column()
    account_type: string;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;

    @Column({ nullable: false })
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}