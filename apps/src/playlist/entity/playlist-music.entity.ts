import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

@Index(['playlist_id', 'music_id'],{ background: true, unique: true } )
@Entity()
export class PlaylistMusic extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    playlist_id: ObjectId;

    @ApiProperty({ type: 'ObjectId', required: true })
    @Column()
    @Index({ background: true })
    music_id: ObjectId;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    @Index({ background: true })
    order: number;

    @ApiProperty({ type: 'number' })
    @Column()
    added_at: number;
}