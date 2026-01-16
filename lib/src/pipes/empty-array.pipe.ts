import { ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';

export class EmptyArrayValidationPipe extends ValidationPipe {
	/**
	 * It takes in a value and checks if it's an array, if it's not, it throws an error. If it is an array,
	 * it checks if it's empty, if it is, it throws an error. If it's not empty, it returns the value
	 * @param {any} value - The value to be transformed.
	 * @returns An array of objects
	 */
	transform(value: any): any {
		try {
			if (!value || !Array.isArray(value) || value.length <= 0)
				throw new HttpException(
					'Body cannot be empty, not be different than an array and array cannot be empty',
					HttpStatus.BAD_REQUEST
				);

			return value;
		} catch (error) {
			throw error;
		}
	}
}
