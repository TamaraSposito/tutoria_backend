import { CreateStudentHandler } from '@app/student/command/handlers/create-student.handler';
import { UpdateStudentHandler } from '@app/student/command/handlers/update-student.handler';

export const CommandHandlers = [CreateStudentHandler, UpdateStudentHandler];
