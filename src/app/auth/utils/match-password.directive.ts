import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** An actor's name can't match the given regular expression */
export const passwordMatchValidator: ValidatorFn = (
	control: AbstractControl,
): ValidationErrors | null => {
	const password = control.get('password')?.value;
	const passwordConfirm = control.get('confirmPassword')?.value;
	return password === passwordConfirm ? null : { mismatch: true };
};
