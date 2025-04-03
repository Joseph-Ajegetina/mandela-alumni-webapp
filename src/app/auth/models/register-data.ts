import { Roles } from './roles';

export interface IRegister {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: Roles;
	password: string;
	dob: Date;
}
