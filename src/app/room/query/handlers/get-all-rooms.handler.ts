import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllRoomsQuery } from '@app/room/query';
import { RoomResponseDto } from '@app/room/dto/room.response.dto';
import { Room } from '@app/room/model/room.model';

@QueryHandler(GetAllRoomsQuery)
export class GetAllRoomsHandler implements IQueryHandler<GetAllRoomsQuery> {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(query: GetAllRoomsQuery): Promise<RoomResponseDto[]> {
    const rooms = await this.roomRepository.find({
      take: query.take,
      skip: query.skip,
    });

    return rooms.map((x) => new RoomResponseDto(x));
  }
}
