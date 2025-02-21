import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { TuiAvatar, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { Constant } from 'src/app/shared/constant/contant';



@Component({
	selector: 'app-register',
	imports: [
		ReactiveFormsModule, TuiInputModule, TuiButton, TuiAvatar, 
		TuiTextfieldControllerModule,TuiSelectModule,  TuiDataList,  TuiDataListWrapper,],
	templateUrl: './register.component.html',
	styleUrl: './register.component.less',
})
export class RegisterComponent {
	constant = Constant
	protected items = [
	'Alumni',
	'Member'
	];
	registerForm: FormGroup = new FormGroup({
		firstName: new FormControl(
			'', 
			[
				Validators.required,
				Validators.minLength(Constant.minLength),
				Validators.maxLength(Constant.maxLength),
			]
		),
		lastName: new FormControl('',
			[
				Validators.required,
				Validators.minLength(Constant.minLength),
				Validators.maxLength(Constant.maxLength),
			]
		),
		email: new FormControl('',
			[
				Validators.required, 
				Validators.pattern(Constant.emailRegex)
			]
		),
		phone: new FormControl('', [
			Validators.required,
			Validators.pattern(Constant.phoneRegex),]
		),
			
		dob: new FormControl('', 
			Validators.required
		),
		role: new FormControl<string | null>(null, Validators.required),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(Constant.minPasswordLength),
			Validators.maxLength(Constant.maxPasswordLength),
		]),
		password2: new FormControl('', [
			Validators.required,
			Validators.minLength(Constant.minConfirmPasswordLength),
			Validators.maxLength(Constant.maxConfirmPasswordLength),
		]),
	});
	
}
