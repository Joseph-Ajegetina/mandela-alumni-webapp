import { TestBed } from '@angular/core/testing';

import { UpcomingeventService } from './upcomingevent.service';

describe('UpcomingeventService', () => {
  let service: UpcomingeventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingeventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
