import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

@Index(["music_id", "user_id"], { background: true, unique: true })
@Entity()
export class Favorites extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    music_id: ObjectId;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    user_id: ObjectId;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}