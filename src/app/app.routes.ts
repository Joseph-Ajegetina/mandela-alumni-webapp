import { Route } from '@angular/router';
import { RegisterComponent } from './features/auth/feature/register/register.component';
import { LoginComponent } from './features/auth/feature/login/login.component';
import { LoginResolve } from './features/auth/data-access/login.resolve';
import { AuthGuard } from './core/guards/auth.guard';
import { ApprovalPageComponent } from './features/approval-page/approval-page/approval-page.component';
import { UserEventPageComponent } from './features/user/user-event-page/user-event-page.component';


export const appRoutes: Route[] = [

	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login',
	},

	{
		path: 'login',
		component: LoginComponent,
		resolve: {
			ready: LoginResolve,
		},
	},
	{
		path: 'pending',
		component: ApprovalPageComponent,
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
			{
				path: 'approvals',
				loadComponent: () =>
					import('./features/admin/approval/approval.component').then((m) => m.ApprovalComponent),
			},
			{
				path: 'userevent',
				loadComponent: () =>
					import('./features/user/user-event-page/user-event-page.component').then((m) => m.UserEventPageComponent),
			},
		],
		canActivateChild: [AuthGuard],
	},

	{
		path: '**',
		loadComponent: () =>
			import('./shared/ui/not-found/not-found.component').then((m) => m.NotFoundComponent),
	},
];
