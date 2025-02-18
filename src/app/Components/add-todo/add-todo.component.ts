import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { TUI_FALSE_HANDLER } from '@taiga-ui/cdk';
import { TuiButton } from '@taiga-ui/core';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { map, startWith, Subject, switchMap, timer } from 'rxjs';
import { TodoService } from 'src/app/Services/todo.service';
import { Constant } from 'src/app/shared/constants/constant';


@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, ReactiveFormsModule, TuiButton, TuiButtonLoading, AsyncPipe],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.less'
})
export class AddTodoComponent {

  todoText = '';
  constant = Constant;

  constructor(
    public todoService: TodoService,
    private router: Router
  ) {}

  addTodo() {
    if (this.todoText.trim()) {
      
      

      this.todoService.addTodo(this.todoText);
      this.trigger$.next();
      this.todoText = '';
      this.router.navigateByUrl('/todo-list');
    }
  }
 
  protected readonly trigger$ = new Subject<void>();
  protected readonly loading$ = this.trigger$.pipe(
      switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading')))
  );
}
