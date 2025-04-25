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
	gender?: string;
    profession?: string;
    country?: string;
	city?: string;
	postalCode?: string;

}

export interface PendingUser extends IUser {
	selected: boolean;
	category?: string;
}
