import { IUser } from '../../../shared/interfaces/user';
export interface IAuthInfo {
	user: IUser;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

export const NewAuthInfo = (data: any): IAuthInfo => {
	return {
		user: data.user,
		accessToken: data.accessToken,
		refreshToken: data.refreshToken,
		expiresIn: Date.now() + data.expiresIn * 1000,
	};
};
