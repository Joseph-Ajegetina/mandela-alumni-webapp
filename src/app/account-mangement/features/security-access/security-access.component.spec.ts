import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAccessComponent } from './security-access.component';

describe('SecurityAccessComponent', () => {
  let component: SecurityAccessComponent;
  let fixture: ComponentFixture<SecurityAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
