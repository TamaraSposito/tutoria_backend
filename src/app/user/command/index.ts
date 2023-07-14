import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import {UpdatePasswordUserDto} from "@app/user/dto/update-password.dto";

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}
export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserDto, public readonly id: string) {}
}

export class UpdatePasswordCommand {
  constructor(public readonly dto: UpdatePasswordUserDto){}
}
export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}
