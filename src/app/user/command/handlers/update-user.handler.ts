import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '@app/user/command';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UserResponseDto> {
    const dto = command.dto;
    const id = command.id;
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.USER_NOT_FOUND, id),
      );

    user.name = dto.name;
    user.mail = dto.mail;
    user.role = dto.role;
    user.block = dto.block;
    user.updatedAt = new Date();
    const response = await this.userRepository.save(user);
    return new UserResponseDto(response);
  }
}
