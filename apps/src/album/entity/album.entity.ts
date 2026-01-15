import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity()
@Index(['artist_id', 'year_release', 'title'], {
    unique: true,
    background: true
})
export class Album extends BaseEntity {
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    title: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    year_release: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    photo: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    @Index({ background: true })
    artist_id?: string;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}