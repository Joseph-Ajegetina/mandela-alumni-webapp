import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { IUser } from '../../shared/interfaces/user';
import { AuthService } from '../auth/data-access/services/auth.service';

@Component({
	selector: 'app-dashboard',
	imports: [CommonModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.less',
})
export class DashboardComponent implements OnInit {
	s: any;
	state$: Observable<IUser | undefined> | null = null;
	private authService = inject(AuthService);

	ngOnInit(): void {
		this.state$ = this.authService.stateItem$.pipe(map((state) => state?.user));
		const storageItem = localStorage.getItem('user');
		if (storageItem) {
			this.s = JSON.parse(storageItem);
		}
	}
}
