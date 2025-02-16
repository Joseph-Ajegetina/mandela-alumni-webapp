import { Route } from '@angular/router';
import { RegisterComponent } from './features/auth/feature/register/register.component';
import { LoginComponent } from './features/auth/feature/login/login.component';
import { LayoutComponent } from './shared/ui/layout/layout.component';

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
		path: 'dashboard',
		component: LayoutComponent,
	},

	{
		path: '**',
		redirectTo: '/register',
	},
];
