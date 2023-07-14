import {v4 as uuidv4} from 'uuid';
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {CreateUserCommand} from '@app/user/command';
import {UserResponseDto} from '@app/user/dto/user.response.dto';
import {User} from '@app/user/model/user.model';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDto> {
    const dto = command.dto;
    const user = new User();

    user.id = uuidv4();
    user.name = dto.name;
    user.mail = dto.mail;
    user.role = dto.role;
    user.password = dto.mail;
    user.createdAt = new Date();

    const response = await this.userRepository.save(user);
    return new UserResponseDto(response);
  }
}
