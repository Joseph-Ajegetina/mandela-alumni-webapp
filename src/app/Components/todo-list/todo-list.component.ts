import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet} from '@angular/router';
import { TodoService } from 'src/app/Services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [ RouterOutlet, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.less'
})
export class TodoListComponent implements OnInit{
  todos: string[] = [];

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  constructor(public todoService: TodoService, private router: Router) {
    this.todos = this.todoService.getTodos();
  }
}
