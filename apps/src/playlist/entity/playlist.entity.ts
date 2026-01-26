import { ApiProperty } from "@nestjs/swagger";
import { User } from "apps/src/user/entity/user.entity";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity()
export class Playlist extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    name: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    description: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    cover_art: string;

    @ApiProperty({ type: 'string', required: false, default: false })
    @Column()
    @Index({ background: true })
    isPublic: boolean

    @ApiProperty({ type: 'string', required: false })
    @Column()
    @Index({ background: true })
    owner_id: User

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}