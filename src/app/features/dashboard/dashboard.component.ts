import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-dashboard',
	imports: [CommonModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.less',
})
export class DashboardComponent implements OnInit {
	s: any;
	ngOnInit(): void {
		this.s = JSON.parse(localStorage.getItem('user') || '').payload;
	}
}
