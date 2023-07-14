import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from '@app/record/command/handlers';
import { QueryHandlers } from '@app/record/query/handlers';
import { Student } from '@app/student/model/student.model';
import { RecordController } from '@app/record/record.controller';
import { User } from '@app/user/model/user.model';
import { Record } from '@app/record/model/record.model';
import { ICurrentUserServiceName } from '@shared/interfaces/current-user.service.interface';
import { CurrentUserService } from '@shared/http/current-user.service';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    TypeOrmModule.forFeature([Record, Student, User]),
  ],
  controllers: [RecordController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      useClass: CurrentUserService,
      provide: ICurrentUserServiceName,
    },
  ],
})
export class RecordModule {}
