import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Album extends BaseEntity {
    @ApiProperty({ type: 'string', required: true })
    @ObjectIdColumn()
    _id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    title: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    year_release: string;

    @ApiProperty({ type: 'string', required: false })
    @Column()
    photo: string;

    @ApiProperty({ type: 'string', required: true })
    @Column()
    artist_id?: string;

    @ApiProperty({ type: 'number' })
    @Column()
    created_at: number;

    @ApiProperty({ type: 'number' })
    @Column()
    updated_at: number;
}