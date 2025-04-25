import { Route } from '@angular/router';
import { RegisterComponent } from './auth/feature/register/register.component';
import { LoginComponent } from './auth/feature/login/login.component';
import { LoginResolve } from './core/resolvers/login.resolve';
import { AuthGuard } from './core/guards/auth.guard';
import { ApprovalPageComponent } from './pending-approval/approval-page/approval-page.component';
import { AdminGuard } from './core/guards/admin.guard';
import { PreferencesComponent } from './features/preferences/preferences.component';

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
		path: 'preferences',
		component: PreferencesComponent
	},

	{
		path: '',
		loadComponent: () =>
			import('../app/shared/ui/layout/layout.component').then((m) => m.LayoutComponent),
		children: [
			{
				path: 'dashboard',
				loadComponent: () =>
					import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
			},
			{
				path: 'approvals',
				loadComponent: () =>
					import('./approval/approval.component').then((m) => m.ApprovalComponent),
			},
			{
				path: 'events',
				loadComponent: () =>
					import('./events/features/events-list/events-list.component').then(
						(m) => m.EventsListComponent,
					),
			},
			{
				path: 'new-event',
				loadComponent: () =>
					import('./events/features/new-event/new-event.component').then(
						(m) => m.NewEventComponent,
					),
			},
		{
			path	: 'payment',
			loadComponent: () =>
				import('./features/payment-page/payment-page.component').then((m) => m.PaymentPageComponent),
		},
		],
		canActivateChild: [AuthGuard, AdminGuard],
	},
	{
		path: 'account',
		loadComponent: () =>
			import('./shared/ui/account-layout/account-layout.component').then(
				(m) => m.AccountLayoutComponent,
			),
		children: [
			{
				path: 'profile',
				loadComponent: () =>
					import('./account-mangement/features/profile-page/profile-page.component').then(
						(m) => m.ProfilePageComponent,
					),
			},
			{
				path: 'security',
				loadComponent: () =>
					import('./account-mangement/features/security-access/security-access.component').then(
						(m) => m.SecurityAccessComponent,
					),
			},
			{
				path: 'preference',
				loadComponent: () =>
					import('./account-mangement/features/preference-page/preference-page.component').then(
						(m) => m.PreferencePageComponent,
					),
			},
		],
	},
	{
		path: '**',
		loadComponent: () =>
			import('./shared/ui/not-found/not-found.component').then((m) => m.NotFoundComponent),
	},
];
