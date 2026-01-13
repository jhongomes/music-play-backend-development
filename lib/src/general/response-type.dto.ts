import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTypeDto {
	@ApiProperty({ type: 'number', enum: Object.values(HttpStatus).filter((a) => typeof a === 'number') })
	statusCode: number;

	@ApiProperty({ type: 'string' })
	message: string | string[];
}
