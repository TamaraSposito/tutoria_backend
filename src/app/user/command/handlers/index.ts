import { CreateUserHandler } from './create-user.handler';
import { UpdateUserHandler } from './update-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import {UpdatePasswordUserHandler} from "@app/user/command/handlers/password-user.handler";
export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  UpdatePasswordUserHandler
];
