import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetStudentQuery } from '@app/student/query';
import { Student } from '@app/student/model/student.model';
import { StudentResponseDto } from '@app/student/dto/student.response.dto';

@QueryHandler(GetStudentQuery)
export class GetStudentHandler implements IQueryHandler<GetStudentQuery> {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async execute(query: GetStudentQuery): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findOne({
      where: { id: query.id },
    });

    if (!student)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.STUDENT_NOT_FOUND, query.id),
      );

    return new StudentResponseDto(student);
  }
}
