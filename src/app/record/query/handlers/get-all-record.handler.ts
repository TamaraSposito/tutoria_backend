import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllRecordsQuery } from '@app/record/query';
import { Record } from '@app/record/model/record.model';
import { RecordResponseDto } from '@app/record/dto/record.response.dto';

@QueryHandler(GetAllRecordsQuery)
export class GetAllRecordsHandler implements IQueryHandler<GetAllRecordsQuery> {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async execute(query: GetAllRecordsQuery): Promise<RecordResponseDto[]> {
    let queryBuilder = this.recordRepository
      .createQueryBuilder('records')
      .setFindOptions({
        skip: query.skip,
        take: query.take,
        relations: {
          student: true,
          user: true,
        },
      });

    if (query.student)
      queryBuilder = queryBuilder.andWhere(`student_id = :s`, {
        s: query.student,
      });

    const records = await queryBuilder.getMany();

    return records.map((x) => new RecordResponseDto(x));
  }
}
