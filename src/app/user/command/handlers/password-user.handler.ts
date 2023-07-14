import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {UpdatePasswordCommand} from '@app/user/command';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import {Inject, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import {ICurrentUserService, ICurrentUserServiceName} from "@shared/interfaces/current-user.service.interface";

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordUserHandler implements ICommandHandler<UpdatePasswordCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(ICurrentUserServiceName)
        private readonly currentUserService: ICurrentUserService,
    ) {}

    async execute(command: UpdatePasswordCommand): Promise<UserResponseDto> {
        const dto = command.dto;
        const userId = this.currentUserService.getUserInfo().userId
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new NotFoundException(
                Utils.stringFormat(MessagesError.USER_NOT_FOUND, userId),
            );

        const validPassword = compareSync(dto.password, user.password)

        if(!validPassword)
        {
            throw new NotAcceptableException(
                Utils.stringFormat(MessagesError.USER_PASSWORD_NOT_MATCH, userId),
            );
        }
        user.sstPassword(dto.newPassword)
        user.updatedAt = new Date();
        const response = await this.userRepository.save(user);
        return new UserResponseDto(response);
    }
}
