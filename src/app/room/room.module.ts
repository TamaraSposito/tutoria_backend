import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from '@app/room/command/handlers';
import { QueryHandlers } from '@app/room/query/handlers';
import { Room } from '@app/room/model/room.model';
import { RoomController } from '@app/room/room.controller';

@Module({
  imports: [CqrsModule, ConfigModule, TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class RoomModule {}
