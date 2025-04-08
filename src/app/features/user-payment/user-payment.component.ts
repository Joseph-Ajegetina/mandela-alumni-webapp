import { UserPaymentService }  from './services/user-payment.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import { userPaymentModel, userCredentialsModel } from './dataModel';
import { userCredential, userPayment } from './data';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

@Component({
	selector: 'app-user-payment',
	imports: [
		CommonModule, 
		RouterModule,
		UserSidebarComponent
	],
	templateUrl: './user-payment.component.html',
	styleUrl: './user-payment.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserPaymentComponent implements OnInit{
	userPayments: userPaymentModel[] = userPayment;
	userCredentials: userCredentialsModel[] = userCredential;
	
	totalDonations = 0;
	totalEventFees = 0;
	totalMonthlyDues = 0;

	constructor(private UserPaymentService: UserPaymentService){}

	ngOnInit():void{
		this.totalDonations = this.UserPaymentService.getAllDonations();
		this.totalEventFees = this.UserPaymentService.getAllEventFees();
		this.totalMonthlyDues = this.UserPaymentService.getAllMonthlyDues();
	}
}
