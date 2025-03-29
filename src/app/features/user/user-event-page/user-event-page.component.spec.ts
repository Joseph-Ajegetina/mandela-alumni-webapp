import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventPageComponent } from './user-event-page.component';

describe('UserEventPageComponent', () => {
	let component: UserEventPageComponent;
	let fixture: ComponentFixture<UserEventPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserEventPageComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserEventPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
