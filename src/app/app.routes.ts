import { Route } from '@angular/router';
import { TodoListComponent } from './Components/todo-list/todo-list.component';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'todo-list',
        pathMatch: 'full'
      },
      {
        path: 'add-todo',
        component: AddTodoComponent
      },
      {
        path: 'todo-list',
        component: TodoListComponent
      },
];
