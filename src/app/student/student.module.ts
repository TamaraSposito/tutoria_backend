import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from '@app/student/student.controller';
import { CommandHandlers } from '@app/student/command/handlers';
import { QueryHandlers } from '@app/student/query/handlers';
import { Student } from '@app/student/model/student.model';
import { Room } from '@app/room/model/room.model';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    TypeOrmModule.forFeature([Student, Room]),
  ],
  controllers: [StudentController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class StudentModule {}
