import { IUser } from '../../../shared/interfaces/user';
export interface IAuthInfo {
	user?: IUser;
	accessToken?: string;
	refreshToken?: string;
	expiresAt?: number;
}

export const NewAuthInfo = (data: any): IAuthInfo => {
	return {
		user: data.user,
		accessToken: data.access_token,
		refreshToken: data.refreshToken,
		expiresAt: Date.now() + data.expiresIn * 1000,
	};
};
