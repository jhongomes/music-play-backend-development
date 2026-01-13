import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity()
export class Music extends BaseEntity {
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    title: string;
    
    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    artist_id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    album_id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true, unique: true })
    user_id: string;

    @ApiProperty({ type: 'number', required: true })
    @Column()
    duration: string;

    @ApiProperty({ type: 'string', required: true })    
    @Column()
    genre: string;

    @ApiProperty({ type: 'string', required: true })    
    @Column()
    sound_url: string;

    @ApiProperty({ type: 'string', required: true })    
    @Column()
    cover_url: string;
}