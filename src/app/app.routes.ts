import { Route } from '@angular/router';
import { RegisterComponent } from './features/auth/feature/register/register.component';
import { LoginComponent } from './features/auth/feature/login/login.component';
import { LoginResolve } from './features/auth/data-access/login.resolve';
import { AuthGuard } from './core/guards/auth.guard';
import { ApprovalPageComponent } from './features/approval-page/approval-page/approval-page.component';
import { AdminGuard } from './core/guards/admin.guard';

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
		],
		canActivateChild: [AuthGuard, AdminGuard],
	},
	{
		path: 'account',
		loadComponent: ()=>
			import('./shared/ui/account-layout/account-layout.component').then((m) => m.AccountLayoutComponent),
		children: [
			{
				path: 'profile',
				loadComponent: ()=>
					import('./features/account-mangement/profile-page/profile-page.component').then((m) =>m.ProfilePageComponent)
			},
			{
				path: 'security',
				loadComponent: ()=>
					import('./features/account-mangement/security-access/security-access.component').then((m) =>m.SecurityAccessComponent)
			},
			{
				path: 'preference',
				loadComponent: ()=>
					import('./features/account-mangement/preference-page/preference-page.component').then((m) =>m.PreferencePageComponent)
			},
		]
	},
	{
		path: '**',
		loadComponent: () =>
			import('./shared/ui/not-found/not-found.component').then((m) => m.NotFoundComponent),
	},
];
