import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import { GetAllUsersQuery } from '@app/user/query';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllRoomsQuery } from '@app/room/query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetAllRoomsQuery): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      take: query.take,
      skip: query.skip,
    });
    return users.map((x) => new UserResponseDto(x));
  }
}
