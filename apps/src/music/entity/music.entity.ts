import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Index(["genre", "artist_id", "album_id", "user_id"], { background: true })
@Entity()
export class Music extends BaseEntity {
    @ApiProperty({ type: 'string' })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    title: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    artist_id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    album_id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    user_id: string;

    @ApiProperty({ type: 'number', required: true })
    @Column()
    duration: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    genre: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    sound_url: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    cover_url: string;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}