import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity{
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    name: string;
    
    @ApiProperty({ type: 'string', required: true })
    @Column()
    email: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    password: string;

    @ApiProperty({ type: 'string', required: true })    
    @Column()
    account_type: string;
}