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
import { RecordResponseDto } from '@app/record/dto/record.response.dto';
import { CreateRecordDto } from '@app/record/dto/create-record.dto';
import { UpdateRecordDto } from '@app/record/dto/update-record.dto';
import { CreateRecordCommand, UpdateRecordCommand } from '@app/record/command';
import { GetAllRecordsQuery, GetRecordQuery } from '@app/record/query';

@ApiTags('Records')
@Controller('api/record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    type: RecordResponseDto,
  })
  async get(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RecordResponseDto> {
    return await this.queryBus.execute(new GetRecordQuery(id));
  }

  @Get()
  @ApiOkResponse({
    type: RecordResponseDto,
    isArray: true,
  })
  async all(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('student') student: string,
  ): Promise<RecordResponseDto[]> {
    return await this.queryBus.execute(
      new GetAllRecordsQuery(take, skip, student),
    );
  }

  @Post()
  @ApiOkResponse({
    type: RecordResponseDto,
  })
  async create(@Body() dto: CreateRecordDto): Promise<RecordResponseDto> {
    return await this.commandBus.execute(new CreateRecordCommand(dto));
  }

  @Put(':id')
  @ApiOkResponse({
    type: RecordResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRecordDto,
  ): Promise<RecordResponseDto> {
    return await this.commandBus.execute(new UpdateRecordCommand(dto, id));
  }
}
