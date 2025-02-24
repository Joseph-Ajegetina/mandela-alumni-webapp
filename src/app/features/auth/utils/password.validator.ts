import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
	const password = g.get('password')?.value;
	const passwordConfirm = g.get('passwordConfirm')?.value;
	return password === passwordConfirm ? null : { mismatch: true };
}
