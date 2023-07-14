import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '@app/room/model/room.model';
import { UpdateRoomCommand } from '@app/room/command';
import { RoomResponseDto } from '@app/room/dto/room.response.dto';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';

@CommandHandler(UpdateRoomCommand)
export class UpdateRoomHandler implements ICommandHandler<UpdateRoomCommand> {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(command: UpdateRoomCommand): Promise<RoomResponseDto> {
    const dto = command.dto;
    const id = command.id;

    const room = await this.roomRepository.findOneBy({
      id: id,
    });

    if (!room)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.ROOM_NOT_FOUND, id),
      );

    room.description = dto.description;
    room.updatedAt = new Date();

    const response = await this.roomRepository.save(room);

    return new RoomResponseDto(response);
  }
}
