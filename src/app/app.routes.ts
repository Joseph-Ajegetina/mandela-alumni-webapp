import { Route } from '@angular/router';
import { TodoListComponent } from './Components/todo-list/todo-list.component';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';
import { RegisterComponent } from './features/auth/feature/register/register.component';
import { LoginComponent } from './features/auth/feature/login/login.component';

  


export const appRoutes: Route[] = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},

	{
		path: '**',
		redirectTo: '/login',
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

