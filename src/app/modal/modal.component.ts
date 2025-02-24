import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    TuiButton,
    TuiError,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
} from '@taiga-ui/core';
import { TuiDrawer,  TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { UserDetails } from './user-details.model';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiButton,
        TuiDrawer,
        TuiError,
        TuiFieldErrorPipe,
        TuiInputModule,
        TuiNotification,
        TuiTextfield,
        TuiTitle,
        AsyncPipe,
    ],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	
	openDrawer = false;
	protected readonly userDetails: UserDetails[] = [];

    protected readonly loginForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required),
    });

    onSubmit(): void {
        if (this.loginForm.valid) {
			const userData: UserDetails = {
				userName : this.loginForm.value.userName || '',
				email: this.loginForm.value.email || '',
				password: this.loginForm.value.password || ''
			};
			this.userDetails.push(userData);
			console.log('User Details:', this.userDetails);
            
			alert(`Successfully log in ${this.loginForm.value.userName}`);
			this.openDrawer=false;
        }
    }
}
