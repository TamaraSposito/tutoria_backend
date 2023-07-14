import { ICurrentUser } from './current-user.interface';

export const ICurrentUserServiceName = 'CurrentUserServiceName';

export interface ICurrentUserService {
  getUserInfo(): ICurrentUser;
}
