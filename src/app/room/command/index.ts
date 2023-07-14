import { CreateRoomDto } from '@app/room/dto/create-room.dto';
import { UpdateRoomDto } from '@app/room/dto/update-room.dto';

export class CreateRoomCommand {
  constructor(public readonly dto: CreateRoomDto) {}
}

export class UpdateRoomCommand {
  constructor(public readonly dto: UpdateRoomDto, public readonly id: string) {}
}

export class DeleteRoomCommand {
  constructor(public readonly id: string) {}
}
