import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Index(['playlist_id', 'music_id'],{ background: true, unique: true } )
@Entity()
export class PlaylistMusic extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    playlist_id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    music_id: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    @Index({ background: true })
    order: number;

    @ApiProperty({ type: 'number' })
    @Column()
    added_at: number;
}