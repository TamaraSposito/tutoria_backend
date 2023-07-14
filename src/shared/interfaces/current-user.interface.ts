import { Role } from '@shared/enums/role.enum';
export interface ICurrentUser {
  userId: string;
  role: Role;
}
