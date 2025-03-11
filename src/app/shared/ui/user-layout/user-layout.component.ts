import { AsyncPipe } from '@angular/common';
import {  Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  TuiPortals } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButton,  TuiFallbackSrcPipe, TuiTextfield} from '@taiga-ui/core';
import { TuiAvatar} from '@taiga-ui/kit';
import {  TuiNavigation, TuiSearch } from '@taiga-ui/layout';


@Component({
  selector: 'app-user-layout',
  imports: [
    AsyncPipe, TuiAvatar, TuiFallbackSrcPipe, TuiButton, RouterOutlet,
    TuiAppearance,
    TuiButton,
    TuiNavigation,
    RouterLink,
    RouterLinkActive,
    TuiSearch,
    ReactiveFormsModule,
    TuiTextfield,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.less',
})
export class UserLayoutComponent  extends TuiPortals{
  protected open = true;
  protected readonly form = new FormGroup({
    search: new FormControl(),
    select: new FormControl(),
    date: new FormControl(),
    switch: new FormControl(),
    filter: new FormControl(),
    segmented: new FormControl(),
});
}
