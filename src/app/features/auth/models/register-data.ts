import { Roles } from './roles';

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: Roles;
}
