import { v4 as uuidv4 } from 'uuid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '@app/room/model/room.model';
import { CreateRoomCommand } from '@app/room/command';
import { RoomResponseDto } from '@app/room/dto/room.response.dto';

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(command: CreateRoomCommand): Promise<RoomResponseDto> {
    const dto = command.dto;
    const room = new Room();

    room.id = uuidv4();
    room.description = dto.description;
    room.createdAt = new Date();

    const response = await this.roomRepository.save(room);
    return new RoomResponseDto(response);
  }
}
