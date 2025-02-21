import { IUser } from '../../../shared/interfaces/user';
export interface IAuthInfo {
	user: IUser;
	accessToken: string;
	refreshToken: string;
}
