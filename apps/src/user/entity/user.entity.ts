import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

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
    @Index({ background: true, unique: true })
    email: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    password: string;

    @ApiProperty({ type: 'string', required: true })    
    @Column()
    account_type: string;

    @ApiProperty({ type: 'number' })
	@Column()
	create_date: number;

	@ApiProperty({ type: 'number' })
	@Column()
	create_time: number;
}