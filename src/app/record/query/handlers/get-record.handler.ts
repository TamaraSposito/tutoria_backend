import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetStudentQuery } from '@app/student/query';
import { GetRecordQuery } from '@app/record/query';
import { Record } from '@app/record/model/record.model';
import { RecordResponseDto } from '@app/record/dto/record.response.dto';

@QueryHandler(GetRecordQuery)
export class GetRecordHandler implements IQueryHandler<GetRecordQuery> {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async execute(query: GetStudentQuery): Promise<RecordResponseDto> {
    const record = await this.recordRepository.findOne({
      where: { id: query.id },
      relations: {
        user: true,
        student: true,
      },
    });

    if (!record)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.RECORD_NOT_FOUND, query.id),
      );

    return new RecordResponseDto(record);
  }
}
