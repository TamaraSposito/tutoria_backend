import { v4 as uuidv4 } from 'uuid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '@app/student/model/student.model';
import { Inject, NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { CreateRecordCommand } from '@app/record/command';
import { User } from '@app/user/model/user.model';
import { RecordResponseDto } from '@app/record/dto/record.response.dto';
import { Record } from '@app/record/model/record.model';
import {
  ICurrentUserService,
  ICurrentUserServiceName,
} from '@shared/interfaces/current-user.service.interface';

@CommandHandler(CreateRecordCommand)
export class CreateRecordHandler
  implements ICommandHandler<CreateRecordCommand>
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,

    @Inject(ICurrentUserServiceName)
    private readonly currentUserService: ICurrentUserService,
  ) {}

  async execute(command: CreateRecordCommand): Promise<RecordResponseDto> {
    const dto = command.dto;

    const userId = this.currentUserService.getUserInfo().userId;

    const record = new Record();

    const user = await this.userRepository.findOneBy({ id: userId });

    const student = await this.studentRepository.findOneBy({
      id: dto.studentId,
    });

    if (!student)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.STUDENT_NOT_FOUND, dto.studentId),
      );

    record.id = uuidv4();
    record.description = dto.description;
    record.user = user;
    record.student = student;
    record.createdAt = new Date();

    const response = await this.recordRepository.save(record);

    return new RecordResponseDto(response);
  }
}
