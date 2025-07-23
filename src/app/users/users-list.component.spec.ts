import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersListComponent', () => {
	let component: UsersListComponent;
	let fixture: ComponentFixture<UsersListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				UsersListComponent,
				HttpClientTestingModule,
				RouterTestingModule,
			],
		}).compileComponents();

		fixture = TestBed.createComponent(UsersListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should map users with correct status', () => {
		const mockUsers = [
			{
				id: 1,
				firstname: 'John',
				lastname: 'Doe',
				email: 'john@example.com',
				phone: '1234567890',
				approvedAt: '2023-01-01',
				disapprovedAt: null,
				createdAt: '2023-01-01',
				city: 'New York',
				country: 'USA',
			},
			{
				id: 2,
				firstname: 'Jane',
				lastname: 'Smith',
				email: 'jane@example.com',
				phone: '0987654321',
				approvedAt: null,
				disapprovedAt: null,
				createdAt: '2023-01-01',
				city: 'London',
				country: 'UK',
			},
		];

		const result = component['mapUsersWithStatus'](mockUsers);

		expect(result[0].status).toBe('approved');
		expect(result[0].statusColor).toBe('success');
		expect(result[1].status).toBe('pending');
		expect(result[1].statusColor).toBe('warning');
	});

	it('should filter users correctly', () => {
		component.users = [
			{
				id: 1,
				firstname: 'John',
				lastname: 'Doe',
				email: 'john@example.com',
				phone: '1234567890',
				status: 'approved',
				statusColor: 'success',
				createdAt: '2023-01-01',
				city: 'New York',
				country: 'USA',
			} as any,
		];

		component.form.get('search')?.setValue('john');
		component['filterUsers']();

		expect(component.filteredUsers.length).toBe(1);
		expect(component.filteredUsers[0].firstname).toBe('John');
	});
}); 