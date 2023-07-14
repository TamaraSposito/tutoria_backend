import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CreateStudentDto } from '@app/student/dto/create-student.dto';
import { StudentResponseDto } from '@app/student/dto/student.response.dto';
import {
  CreateStudentCommand,
  UpdateStudentCommand,
} from '@app/student/command';
import { UpdateStudentDto } from '@app/student/dto/update-student.dto';
import { GetAllStudentsQuery, GetStudentQuery } from '@app/student/query';

@ApiTags('Students')
@Controller('api/student')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  async get(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<StudentResponseDto> {
    return await this.queryBus.execute(new GetStudentQuery(id));
  }

  @Get()
  @ApiOkResponse({
    type: StudentResponseDto,
    isArray: true,
  })
  async all(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<StudentResponseDto[]> {
    return await this.queryBus.execute(new GetAllStudentsQuery(take, skip));
  }

  @Post()
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  async create(@Body() dto: CreateStudentDto): Promise<StudentResponseDto> {
    return await this.commandBus.execute(new CreateStudentCommand(dto));
  }

  @Put(':id')
  @ApiOkResponse({
    type: StudentResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    return await this.commandBus.execute(new UpdateStudentCommand(dto, id));
  }
}
