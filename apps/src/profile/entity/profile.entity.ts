import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity()
export class Profile extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    name: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    photo: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    email: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    date_of_birth: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    genre: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    user_id: string;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}