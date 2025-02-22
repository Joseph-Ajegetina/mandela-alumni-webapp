import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, filter, finalize, Observable, Subject, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/data-access/services/auth.service';
import { AuthState } from 'src/app/features/auth/data-access/state/auth.state';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AppInterceptor implements HttpInterceptor {
	authState = inject(AuthState);
	authService = inject(AuthService);

	recall = new Subject<boolean>();

	private isBusy: boolean = false;
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
		if (!this.isBusy) {
			this.isBusy = true;
			this.recall.next(false);
			return this.authService.refreshToken().pipe(
				switchMap((result: boolean) => {
					if (result) {
						this.recall.next(true);
						return next.handle(originalRequest.clone({ setHeaders: this.getHeaders() }));
					}
					return throwError(() => new Error('Token refresh failed'));
				}),
				catchError((error) => {
					this.authState.logout(true);
					return throwError(() => error);
				}),
				finalize(() => {
					this.isBusy = false;
				}),
			);
		} else {
			return this.recall.pipe(
				filter((ready) => ready === true),
				switchMap((ready) => {
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
