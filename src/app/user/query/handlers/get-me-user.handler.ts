import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserResponseDto } from '@app/user/dto/user.response.dto';
import { GetMeUserQuery } from '@app/user/query';
import {Inject, NotFoundException} from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { User } from '@app/user/model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import {ICurrentUserService, ICurrentUserServiceName} from "@shared/interfaces/current-user.service.interface";

@QueryHandler(GetMeUserQuery)
export class GetMeUserHandler implements IQueryHandler<GetMeUserQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(ICurrentUserServiceName)
        private readonly currentUserService: ICurrentUserService,
    ) {}

    async execute(): Promise<UserResponseDto> {

        const userId = this.currentUserService.getUserInfo().userId;

        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new NotFoundException(
                Utils.stringFormat(MessagesError.USER_NOT_FOUND, userId),
            );

        return new UserResponseDto(user);
    }
}
