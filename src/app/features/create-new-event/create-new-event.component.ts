import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TUI_FALSE_HANDLER, TuiDay } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList, TuiIcon, TuiLabel, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiButtonLoading, TuiDataListWrapper, TuiFileLike, TuiFiles } from '@taiga-ui/kit';
import { TuiInputDateModule, TuiNamedDay, TuiSelectModule, TuiTextareaModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { map, startWith, Subject, switchMap, timer, } from 'rxjs';

@Component({
  selector: 'app-create-new-event',
  imports: [NgIf, ReactiveFormsModule, TuiAvatar, TuiFiles, TuiIcon, TuiLink, TuiTextfield, 
    FormsModule, TuiInputDateModule, TuiLabel, TuiTextareaModule, TuiTextfieldControllerModule,
    TuiDataList, TuiSelectModule, TuiDataListWrapper, AsyncPipe, TuiButton, TuiButtonLoading
  ],
  templateUrl: './create-new-event.component.html',
  styleUrl: './create-new-event.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewEventComponent {
  protected readonly control = new FormControl<TuiFileLike | null>(null);

  protected file: TuiFileLike | null = null;

  protected eventpage = new FormGroup({
    event: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });


  protected from: TuiDay | null = null;
  protected to: TuiDay | null = null;
  protected min = new TuiDay(2017, 9, 4);
  protected max = TuiDay.currentLocal();
  protected items = [new TuiNamedDay(TuiDay.currentLocal(), 'Until today')];

  protected items1 = [
    'Digital Training',
    'Home Coming',
    'Leadership Seminar',
    'Product Launch',
    'Team Building',
    'Workshop',
];

protected selectfield = new FormControl<string | null>(null);

protected readonly trigger$ = new Subject<void>();
protected readonly loading$ = this.trigger$.pipe(
    switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
);

protected readonly triggers$ = new Subject<void>();
protected readonly loadings$ = this.triggers$.pipe(
    switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading'))),
);


onFileSelect(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const files = inputElement.files;

  if (files && files.length > 0) {
    const uploadedFile = files[0];
    this.file = { 
      name: uploadedFile.name,
      size: uploadedFile.size,
      type: uploadedFile.type
    };
    this.control.setValue(this.file);
  }
}
onDragOver(event: DragEvent): void {
  event.preventDefault();
}

onDrop(event: DragEvent): void {
  event.preventDefault();
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const uploadedFile = event.dataTransfer.files[0];
      this.file = { 
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type
      };
      this.control.setValue(this.file);
  }
}
	 
};