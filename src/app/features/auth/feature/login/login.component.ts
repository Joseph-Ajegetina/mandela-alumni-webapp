import {ChangeDetectionStrategy, Component, inject, NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TuiInputModule, } from '@taiga-ui/legacy';
import { TuiAlertService, TuiButton, TuiLink, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import {TuiButtonLoading, TuiPassword} from '@taiga-ui/kit';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';
import {map, startWith, Subject, switchMap, timer} from 'rxjs';
import {RouterLink} from '@angular/router';
import { TuiTextfieldControllerModule } from '@taiga-ui/legacy';



@Component({
	standalone: true,
	imports: [
		CommonModule, 
		ReactiveFormsModule, 
		FormsModule,
		TuiInputModule, 
		AsyncPipe, 
		TuiButton, 
		TuiButtonLoading,
		RouterLink,
		TuiLink,
		TuiTextfieldControllerModule,
		TuiIcon,
		TuiPassword,
		TuiTextfield
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	loginForm = new FormGroup({
        email: new FormControl(''),
		password: new FormControl(''),
    });


	protected readonly trigger$ = new Subject<void>();
    protected readonly loading$ = this.trigger$.pipe(
        switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
    );
	private readonly alerts = inject(TuiAlertService); // Injecting Taiga UI alert service
	protected value = '';



	onSubmit() {
		if (this.loginForm.valid) {
		  this.trigger$.next();
		  const { email } = this.loginForm.value;
	
		  // Simulate a delay for login process
		  setTimeout(() => {
			this.alerts.open(`Logged in as ${email}`).subscribe();
		}, 2000);
		} else {
		  this.alerts.open('Please fill in all fields!', {label: 'Error'}).subscribe();
		}
	  }
	  protected readonly routes=  {
		signUp: '',
	  };

	
}

