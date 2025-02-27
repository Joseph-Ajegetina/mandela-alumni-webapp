import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuicklinsComponent } from './quicklinks.component';

describe('QuicklinsComponent', () => {
	let component: QuicklinsComponent;
	let fixture: ComponentFixture<QuicklinsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [QuicklinsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(QuicklinsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
