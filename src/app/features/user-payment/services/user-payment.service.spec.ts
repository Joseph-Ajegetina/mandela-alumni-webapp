import {UserPaymentService} from '../services/user-payment.service'
import { TestBed } from '@angular/core/testing';

describe('UserPaymentService', () => {
  let service: UserPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
