import { Component, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterData } from '../../models/register-data';
import {
	TuiAppearance,
	TuiButton,
	TuiError,
	TuiGroup,
	TuiIcon,
	TuiTextfield,
	TuiTitle,
} from '@taiga-ui/core';
import {
	TuiAvatar,
	TuiFieldErrorPipe,
	tuiInputPhoneInternationalOptionsProvider,
	TuiPassword,
	TuiSortCountriesPipe,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiInputPhoneModule } from '@taiga-ui/legacy';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { defer } from 'rxjs';
import { getCountries } from 'libphonenumber-js';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { TuiDropdownMobile } from '@taiga-ui/addon-mobile';
import type { TuiCountryIsoCode } from '@taiga-ui/i18n';

@Component({
	selector: 'app-register-form',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TuiInputPhoneModule,
		TuiSelectModule,
		TuiAppearance,
		TuiCardLarge,
		TuiForm,
		TuiTitle,
		TuiButton,
		TuiError,
		TuiFieldErrorPipe,
		TuiHeader,
		TuiButton,
		TuiDropdownMobile,
		TuiInputPhoneInternational,
		TuiSortCountriesPipe,
		TuiTextfield,
		TuiAvatar,
		TuiGroup,
		TuiIcon,
		TuiPassword,
	],
	templateUrl: './register-form.component.html',
	styleUrl: './register-form.component.less',
	providers: [
		tuiInputPhoneInternationalOptionsProvider({
			metadata: defer(async () => import('libphonenumber-js/max/metadata').then((m) => m.default)),
		}),
	],
})
export class RegisterFormComponent {
	@Input() form!: FormGroup;
	onRegisterUser = output<void>();

	protected readonly countries = getCountries();
	protected countryIsoCode: TuiCountryIsoCode = 'GH';

	registerUser() {
		this.onRegisterUser.emit();
	}
}
