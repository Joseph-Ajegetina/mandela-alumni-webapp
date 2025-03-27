export interface IUser {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
	phone: string;
	verifiedSmsAt: string;
	verifiedEmailAt: string;
	approvedAt: string;
	disapprovedAt: string;
	superAdmin: string;
	createdAt: string;
	updatedAt: string;
}

export interface PendingUser extends IUser {
	selected: boolean;
	category?: string;
}
