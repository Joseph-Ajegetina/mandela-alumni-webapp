import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsSlideshowComponent } from './events-slideshow.component';

describe('EventsSlideshowComponent', () => {
	let component: EventsSlideshowComponent;
	let fixture: ComponentFixture<EventsSlideshowComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EventsSlideshowComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EventsSlideshowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
