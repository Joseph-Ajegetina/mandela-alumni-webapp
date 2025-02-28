import { TestBed } from '@angular/core/testing';

import { QuicklinksService } from '../../../quicklinks.service';

describe('QuicklinksService', () => {
  let service: QuicklinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuicklinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
