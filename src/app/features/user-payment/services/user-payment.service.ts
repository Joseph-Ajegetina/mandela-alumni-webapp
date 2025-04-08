import { userCredential, userPayment } from '../data';
import { Injectable } from '@angular/core';
import {userCredentialsModel, userPaymentModel } from '../dataModel';
import { PaymentType } from '../enum.model';

@Injectable({
  providedIn: 'root'
})
export class UserPaymentService {
  constructor() { }

  getUserPayments(): userPaymentModel[] {
    return userPayment;
  }
  getUserCredentials(): userCredentialsModel[]{
    return userCredential;
  }
  getAllDonations():number{
    return userPayment
      .filter(payment => payment.paymentType === PaymentType.donations)
      .reduce((total,payment) => total + payment.amount,0)
  }
  getAllEventFees(): number {
      return userPayment
        .filter(payment => payment.paymentType === PaymentType.event_fees)
        .reduce((total, payment) => total + payment.amount, 0);
  }
  getAllMonthlyDues(): number {
      return userPayment
        .filter(payment => payment.paymentType === PaymentType.monthly_dues)
        .reduce((total, payment) => total + payment.amount, 0);
  }
}