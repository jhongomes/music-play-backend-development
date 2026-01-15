import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * The decorator will validate the value of the property against the min and max values
 * @param {number} min - The minimum value that the number can be.
 * @param {number} max - The maximum value allowed.
 * @param {ValidationOptions} [validationOptions] - ValidationOptions = {
 * @returns A function that returns a function.
 */
export function LimitMinMax(min: number, max: number, validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		/* istanbul ignore next */
		registerDecorator({
			name: 'limitMinMax',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [min, max],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const min = args.constraints[0];
					const max = args.constraints[1];
					return Number(value) >= Number(min) && Number(value) <= Number(max);
				}
			}
		});
	};
}

/**
 * Validate that the value of the property is greater than or equal to the provided number.
 * @param {number} property - The minimum page number.
 * @param {ValidationOptions} [validationOptions] - ValidationOptions
 * @returns A function that will be used to register the validation function.
 */
export function PageMin(property: number, validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		/* istanbul ignore next */
		registerDecorator({
			name: 'pageMin',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const constraint = args.constraints[0];
					return Number(value) >= Number(constraint);
				}
			}
		});
	};
}
