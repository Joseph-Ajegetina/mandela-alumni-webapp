import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { TuiAvatar, TuiChip } from '@taiga-ui/kit';
import { ActionButtonsComponent } from '../../../shared/action-buttons/action-buttons.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '@mandela-alumni-webapp/core-data';
import { AuthState } from '@mandela-alumni-webapp/core-state';
import { IUser } from 'src/app/shared/interfaces/user';
import { NgIf } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiCardMedium } from '@taiga-ui/layout';

@Component({
	selector: 'app-profile-page',
	imports: [
		TuiAvatar,
		ActionButtonsComponent,
		NgIf,
		FormsModule,
		ReactiveFormsModule,
		TuiCardMedium,
		TuiChip,
	],
	templateUrl: './profile-page.component.html',
	styleUrl: './profile-page.component.less',
})
export class ProfilePageComponent implements OnInit, OnChanges {
	profileForm: FormGroup;
	currentUser!: IUser;
	userId!: number;
	profileImage: string | ArrayBuffer | null = null;
	selectedImageFile: File | null = null;
	imageLoaded: boolean = false;

	constructor(
		private fb: FormBuilder,
		private userService: UsersService,
		private authState: AuthState,
		private cdr: ChangeDetectorRef,
		private alerts: TuiAlertService,
	) {
		this.profileForm = this.fb.group({
			firstname: [''],
			lastname: [''],
			email: [''],
			phone: [''],
			profession: [''],
			dob: [''],
			city: [''],
			country: [''],
			postalCode: [''],
			profile: [''],
			gender: [''],
		});
	}
	ngOnInit(): void {
		const user = this.authState.getUser();
		console.log('user ', user);
		if (user) {
			this.currentUser = user;
			this.userId = user.id;
			this.profileForm.patchValue(user);
			this.profileImage = this.currentUser.profile || null;
		}
	}
	ngOnChanges() {}
	isEditing: { [key: string]: boolean } = {
		user: false,
		personal: false,
		address: false,
	};
	getButtonsFor(section: string) {
		return this.isEditing[section]
			? [
					{ label: 'Save', icon: '@tui.check', appearance: 'positive', action: 'save' },
					{ label: 'Cancel', icon: '@tui.x', appearance: 'danger', action: 'cancel' },
			  ]
			: [{ label: 'Edit', icon: '@tui.pencil-line', appearance: 'accent', action: 'edit' }];
	}

	loadUserProfile() {
		this.userService.getById(this.userId).subscribe({
			next: (userData) => {
				this.profileForm.patchValue({
					firstname: userData.firstName,
					lastname: userData.lastName,
					email: userData.email,
					phone: userData.phone,
					profession: userData.role,
					dob: userData.dob,
					city: userData,
					country: userData.country,
					postalCode: userData.postalCode,
				});
			},
			error: (err) => {
				console.error('Failed to load user profile', err);
			},
		});
	}

	onImageSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		this.selectedImageFile = file;

		const reader = new FileReader();
		reader.onload = () => {
			this.profileImage = reader.result;
			this.imageLoaded = true;
			this.cdr.detectChanges();
		};
		reader.readAsDataURL(file);
	}
	getProfileImageUrl(image: string | ArrayBuffer | null): string {
		if (!image) return '';

		if (typeof image === 'string' && image.startsWith('http')) {
			return image;
		}
		if (typeof image === 'string' && image.startsWith('data:image')) {
			return image;
		}

		return `${environment.domain}/profiles/${image}`;
	}

	updateProfile() {
		const formData = new FormData();
		formData.append('firstname', this.profileForm.get('firstname')?.value);
		formData.append('lastname', this.profileForm.get('lastname')?.value);
		formData.append('email', this.profileForm.get('email')?.value);
		formData.append('phone', this.profileForm.get('phone')?.value);
		formData.append('city', this.profileForm.get('city')?.value);
		formData.append('country', this.profileForm.get('country')?.value);
		formData.append('postalCode', this.profileForm.get('postalCode')?.value);
		formData.append('profession', this.profileForm.get('profession')?.value);
		formData.append('dob', this.profileForm.get('dob')?.value);
		formData.append('gender', this.profileForm.get('gender')?.value);

		if (this.selectedImageFile) {
			formData.append('file', this.selectedImageFile, this.selectedImageFile.name);
		}

		this.userService.update(this.userId, formData).subscribe({
			next: (res) => {
				console.log('Profile updated', res);
				this.isEditing['user'] = false;
				this.isEditing['personal'] = false;
				this.isEditing['address'] = false;
			},
			error: (err) => {
				console.error('Update failed', err);
			},
		});
	}

	handleAction(action: string, section: string) {
		switch (action) {
			case 'edit':
				this.isEditing[section] = true;
				break;
			case 'save':
				this.saveProfile(section);
				break;
			case 'cancel':
				this.isEditing[section] = false;
				break;
		}
	}

	onSave(): void {
		if (!this.imageLoaded) {
			console.log('Image not yet loaded.');
			return;
		}
		this.saveProfile('user');
	}
	saveProfile(section: string) {
		const payload = this.profileForm.value;
		const formData = new FormData();

		Object.entries(payload).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				formData.append(key, value as string);
			}
		});

		if (this.selectedImageFile) {
			formData.append('file', this.selectedImageFile);
		}

		this.userService.update(this.userId, formData).subscribe({
			next: (res) => {
				this.alerts
					.open(' Profile Successfully Updated', {
						label: 'Success',
						appearance: 'positive',
					})
					.subscribe();

				console.log('Profile updated', res);
				this.currentUser = res;
				this.profileImage = this.currentUser.profile || null;
				this.isEditing[section] = false;
			},
			error: (err) => {
				this.alerts
					.open('Failed to update profile', {
						label: 'Error',
						appearance: 'negative',
					})
					.subscribe();
				console.error('Update failed', err);
			},
		});
	}
}
