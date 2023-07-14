import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '@app/user/user.controller';
import { CommandHandlers } from './command/handlers';
import { QueryHandlers } from './query/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/model/user.model';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import {CurrentUserService} from "@shared/http/current-user.service";
import {ICurrentUserServiceName} from "@shared/interfaces/current-user.service.interface";

@Module({
  imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [...CommandHandlers,
    ...QueryHandlers,
    JwtStrategy,
    {
    useClass: CurrentUserService,
    provide: ICurrentUserServiceName,
  },
  ],
})
export class UserModule {}
