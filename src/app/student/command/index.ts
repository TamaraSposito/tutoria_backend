import { CreateStudentDto } from '@app/student/dto/create-student.dto';
import { UpdateStudentDto } from '@app/student/dto/update-student.dto';

export class CreateStudentCommand {
  constructor(public readonly dto: CreateStudentDto) {}
}

export class UpdateStudentCommand {
  constructor(
    public readonly dto: UpdateStudentDto,
    public readonly id: string,
  ) {}
}
