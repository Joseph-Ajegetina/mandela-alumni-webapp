import { Component, OnInit } from '@angular/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { ActionButtonsComponent } from "../../../shared/action-buttons/action-buttons.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '@mandela-alumni-webapp/core-data';
import { IRegister } from '@mandela-alumni-webapp/api-interfaces';
import { AuthState } from '@mandela-alumni-webapp/core-state';
import { IUser } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-profile-page',
  imports: [TuiAvatar,  ActionButtonsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.less'
})
export class ProfilePageComponent implements OnInit { 
  profileForm: FormGroup;
  currentUser!: IUser;
  userId!: number; 

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authState: AuthState
  ) {
    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
    });
  }
  ngOnInit(): void {
    const user = this.authState.getUser(); 
    if (user) {
      this.currentUser = user;
      this.userId = user.id; // <-- ✅ Assign userId
      this.profileForm.patchValue(user);
    }
  }

  isEditing: { [key: string]: boolean } = {
    user: false,
    personal: false,
    address: false,
  };
  getButtonsFor(section: string) {
    return this.isEditing[section]
      ? [
          { label: 'Save', icon: '@tui.check', appearance: 'positive', action: 'save' },
 
        ]
      : [
          { label: 'Edit', icon: '@tui.pencil-line', appearance: 'accent', action: 'edit' },
        ];
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
        });
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
  profileImage: string | ArrayBuffer | null = null; 
  selectedImageFile: File | null = null;           
  
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
  
    const file = input.files[0];
    this.selectedImageFile = file;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
    };
    reader.readAsDataURL(file);
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
  

  saveProfile(section: string) {
    const payload = this.profileForm.value;
    const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  if (this.selectedImageFile) {
    formData.append('avatar', this.selectedImageFile);
  }

    this.userService.update(this.userId, payload).subscribe({
      next: (res) => {
        console.log('Profile updated', res);
    
        this.isEditing[section] = false;
      },
      error: (err) => {
        console.error('Update failed', err);
      },
    });
  }
}
  

