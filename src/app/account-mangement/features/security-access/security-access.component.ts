import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { TuiIcon, TuiTitle, TuiAppearance} from '@taiga-ui/core';
import {TuiBlock, TuiButtonGroup} from '@taiga-ui/kit';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-security-access',
  imports: [ 
    TuiIcon,
    TuiBlock,
    ReactiveFormsModule,
    TuiTitle,
    TuiButtonGroup,
    TuiAppearance,
  ],
  templateUrl: './security-access.component.html',
  styleUrl: './security-access.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityAccessComponent {
  protected readonly testForm = new FormGroup({
    testValue3: new FormControl(),
});
}
