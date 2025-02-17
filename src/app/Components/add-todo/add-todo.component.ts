import { Component } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TodoService } from 'src/app/Services/todo.service';
import { Constant } from 'src/app/shared/constants/constant';


@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, ReactiveFormsModule, TuiButton, ],
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
      this.todoText = '';
      this.router.navigateByUrl('/todo-list');
    }
  }

}
