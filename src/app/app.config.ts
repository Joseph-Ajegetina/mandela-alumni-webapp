import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { authFactory, AuthService } from './features/auth/data-access/services/auth.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideAnimations(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideHttpClient(),
		provideAppInitializer(() => {
			authFactory(inject(AuthService));
		}),
		NG_EVENT_PLUGINS,
	],
};
