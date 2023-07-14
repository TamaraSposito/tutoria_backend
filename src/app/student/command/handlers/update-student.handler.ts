import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStudentCommand } from '@app/student/command';
import { Student } from '@app/student/model/student.model';
import { StudentResponseDto } from '@app/student/dto/student.response.dto';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Room } from '@app/room/model/room.model';

@CommandHandler(UpdateStudentCommand)
export class UpdateStudentHandler
  implements ICommandHandler<UpdateStudentCommand>
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async execute(command: UpdateStudentCommand): Promise<StudentResponseDto> {
    const dto = command.dto;
    const id = command.id;

    const student = await this.studentRepository.findOneBy({
      id: id,
    });

    if (!student)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.STUDENT_NOT_FOUND, id),
      );

    const room = await this.roomRepository.findOneBy({ id: dto.roomId });

    if (!room)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.ROOM_NOT_FOUND, id),
      );

    console.log(student)
    student.name = dto.name;
    student.sponsor = dto.sponsor;
    student.sponsorMail = dto.sponsorMail;
    student.sponsorPhone = dto.sponsorPhone;
    student.birthday = dto.birthday;
    student.room = room;
    student.updatedAt = new Date();

    const response = await this.studentRepository.save(student);
    return new StudentResponseDto(response);
  }
}
