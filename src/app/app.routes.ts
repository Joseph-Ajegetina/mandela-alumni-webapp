import { Route } from '@angular/router';
import { RegisterComponent } from './features/auth/feature/register/register.component';
import { LoginComponent } from './features/auth/feature/login/login.component';
import { LoginResolve } from './features/auth/data-access/login.resolve';

export const appRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard',
	},
	{
		path: 'login',
		component: LoginComponent,
		resolve: {
			ready: LoginResolve,
		},
	},
	{
		path: 'register',
		component: RegisterComponent,
	},

	{
		path: '',
		loadComponent: () =>
			import('../app/shared/ui/layout/layout.component').then((m) => m.LayoutComponent),
		children: [
			{
				path: 'dashboard',
				loadComponent: () =>
					import('../app/features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
			},
		],
	},
];
