import { GetUserHandler } from './get-user.handler';
import { GetAllUserHandler } from './get-all-users.handler';
import {GetMeUserHandler} from "@app/user/query/handlers/get-me-user.handler";
export const QueryHandlers = [GetUserHandler, GetAllUserHandler, GetMeUserHandler];
