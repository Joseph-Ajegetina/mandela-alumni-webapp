import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, filter, finalize, Observable, Subject, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/data-access/services/auth.service';
import { AuthState } from '@mandela-alumni-webapp/core-state';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AppInterceptor implements HttpInterceptor {
	authState = inject(AuthState);
	authService = inject(AuthService);

	// if refreshing token, it is busy, lock
	private isBusy: boolean = false;

	// create a subject to queue outstanding refresh calls
	recall = new Subject<boolean>();

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const adjustedRequest = req.clone({
			setHeaders: this.getHeaders(),
		});

		return next.handle(adjustedRequest).pipe(
			catchError((error) => {
				if (
					error instanceof HttpErrorResponse &&
					error.status === 401 &&
					req.url.indexOf('login') < 0
				) {
					return this.handle401Error(adjustedRequest, next);
				}

				return throwError(() => error);
			}),
		);
	}

	private handle401Error(originalRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// let's first try to submit a refresh access token request
		// return authService.RefreshToken()
		// switchMap when done to resubmit the req passed, using next.handler
		// catchError means it is not working, rethrow and logout
		if (!this.isBusy) {
			this.isBusy = true;

			// progress subject to false
			this.recall.next(false);
			return this.authService.refreshToken().pipe(
				switchMap((result: boolean) => {
					if (result) {
						// progress subject to true
						this.recall.next(true);

						// token saved (in RefreshToken), now recall the original req after adjustment
						return next.handle(originalRequest.clone({ setHeaders: this.getHeaders() }));
					}
					return throwError(() => new Error('Token refresh failed'));
				}),
				catchError((error) => {
					// else refresh token did not work, its bigger than both of us
					// log out and throw error
					this.authState.logout(true);
					return throwError(() => error);
				}),
				finalize(() => {
					this.isBusy = false;
				}),
			);
		} else {
			// return the subject, watch when it's ready, switch to recall original request
			return this.recall.pipe(
				filter((ready) => ready === true),
				switchMap((ready) => {
					// try again with adjusted header
					return next.handle(originalRequest.clone({ setHeaders: this.getHeaders() }));
				}),
			);
		}
	}

	private getHeaders() {
		let headers = {};

		const _auth = this.authState.getToken();
		if (_auth && _auth !== '') {
			headers = {
				Authorization: `Bearer ${_auth}`,
			};
		}

		return headers;
	}
}
