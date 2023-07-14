import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '@app/user/command';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { MessagesError } from '@shared/resources/messages-error';
import { Utils } from '@shared/utils';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: command.id,
      },
    });

    if (!user)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.USER_NOT_FOUND, command.id),
      );

    user.deleteAt = new Date();
    await this.userRepository.save(user);
  }
}
