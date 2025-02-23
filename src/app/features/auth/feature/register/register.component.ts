import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Add Router import
import { TUI_FALSE_HANDLER } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList } from '@taiga-ui/core';
import { TuiAvatar, TuiButtonLoading, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { map, startWith, Subject, switchMap, timer } from 'rxjs';
import { Constant } from 'src/app/shared/constant/contant';
import { IRegisterMessage } from 'src/app/shared/interfaces/register';
import { ServiceService } from 'src/app/shared/services/service.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, TuiInputModule, TuiButton, TuiAvatar,
    TuiTextfieldControllerModule, TuiSelectModule, TuiDataList,
    TuiDataListWrapper, TuiButton, TuiButtonLoading, AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent {
  constant = Constant;
  errorMessage = '';
  successMessage: string | null = null;
  memberReistration = inject(ServiceService);
  private router = inject(Router);  // Inject Router

  protected items = [
    'Alumni',
    'Member'
  ];

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(Constant.minLength),
        Validators.maxLength(Constant.maxLength),
      ]
    ),
    lastname: new FormControl('',
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
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(Constant.minConfirmPasswordLength),
      Validators.maxLength(Constant.maxConfirmPasswordLength),
    ]),
  });

  protected readonly trigger$ = new Subject<void>();
  protected readonly loading$ = this.trigger$.pipe(
    switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
  );
  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Check if passwords match
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmpassword')?.value;
  
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      window.alert(this.errorMessage);
      return;
    }

    this.memberReistration.registerUser(this.registerForm.value).subscribe({
      next: (res: IRegisterMessage) => {
        // Provide a default success message if the backend doesn't return one
        this.successMessage = res.message || 'Registration successful!';
        window.alert(this.successMessage);
        
        console.log('Registration successful:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
		 // Handle error response
		// this.errorMessage = err.error.error || 'An error occurred';

		//  // Check if error is due to network or server issue
		//  if (err.status === 0) {
		//    this.errorMessage = 'Network error: Unable to reach the server. Please try again later.';
		//  } else if (err.status === 400) {
		//    // Bad request error (possibly validation failure)
		//    this.errorMessage = 'Registration failed. Please check your input and try again.';
		//  } else if (err.status === 500) {
		//    // Server error
		//    this.errorMessage = 'Internal server error. Please try again later.';
		//  } else {
		//    // Default error message for other cases
		//    this.errorMessage = 'An unknown error occurred. Please try again.';
		//  }
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        console.error('Registration failed:', err);
      }
    });
  }
}
