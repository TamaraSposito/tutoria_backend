import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '@app/user/query';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetRoomQuery } from '@app/room/query';
import { Room } from '@app/room/model/room.model';
import { RoomResponseDto } from '@app/room/dto/room.response.dto';

@QueryHandler(GetRoomQuery)
export class GetRoomHandler implements IQueryHandler<GetRoomQuery> {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(query: GetUserQuery): Promise<RoomResponseDto> {
    const room = await this.roomRepository.findOneBy({ id: query.id });

    if (!room)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.ROOM_NOT_FOUND, query.id),
      );

    return new RoomResponseDto(room);
  }
}
