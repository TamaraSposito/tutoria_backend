import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllStudentsQuery } from '@app/student/query';
import { Student } from '@app/student/model/student.model';
import { StudentResponseDto } from '@app/student/dto/student.response.dto';
@QueryHandler(GetAllStudentsQuery)
export class GetAllStudentsHandler
  implements IQueryHandler<GetAllStudentsQuery>
{
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async execute(query: GetAllStudentsQuery): Promise<StudentResponseDto[]> {
    const student = await this.studentRepository.find({
      take: query.take,
      skip: query.skip,
    });
    return student.map((x) => new StudentResponseDto(x));
  }
}
