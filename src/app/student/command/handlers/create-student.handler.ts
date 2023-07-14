import { v4 as uuidv4 } from 'uuid';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentCommand } from '@app/student/command';
import { Student } from '@app/student/model/student.model';
import { StudentResponseDto } from '@app/student/dto/student.response.dto';
import { Room } from '@app/room/model/room.model';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';

@CommandHandler(CreateStudentCommand)
export class CreateStudentHandler
  implements ICommandHandler<CreateStudentCommand>
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(command: CreateStudentCommand): Promise<StudentResponseDto> {
    const dto = command.dto;
    const student = new Student();

    const room = await this.roomRepository.findOneBy({ id: dto.roomId });

    if (!room)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.ROOM_NOT_FOUND, dto.roomId),
      );

    student.id = uuidv4();
    student.name = dto.name;
    student.sponsor = dto.sponsor;
    student.sponsorMail = dto.sponsorMail;
    student.sponsorPhone = dto.sponsorPhone;
    student.birthday = dto.birthday;
    student.room = room;
    student.createdAt = new Date();

    const response = await this.studentRepository.save(student);

    return new StudentResponseDto(response);
  }
}
