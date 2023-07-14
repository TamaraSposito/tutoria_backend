import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import { GetUserQuery } from '@app/user/query';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.id,
      },
    });

    if (!user)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.USER_NOT_FOUND, query.id),
      );

    return new UserResponseDto(user);
  }
}
