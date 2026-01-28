import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

@Index(['user_id', 'playlist_id'], { unique: true, background: true })
@Entity()
export class UserPlaylist extends BaseEntity {
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    user_id: ObjectId;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    playlist_id: ObjectId;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}