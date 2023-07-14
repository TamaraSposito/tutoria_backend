import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Utils } from '@shared/utils';
import { MessagesError } from '@shared/resources/messages-error';
import { UpdateRecordCommand } from '@app/record/command';
import { Record } from '@app/record/model/record.model';
import { RecordResponseDto } from '@app/record/dto/record.response.dto';
@CommandHandler(UpdateRecordCommand)
export class UpdateRecordHandler
  implements ICommandHandler<UpdateRecordCommand>
{
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async execute(command: UpdateRecordCommand): Promise<RecordResponseDto> {
    const dto = command.dto;
    const id = command.id;

    const record = await this.recordRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        student: true,
      },
    });

    if (!record)
      throw new NotFoundException(
        Utils.stringFormat(MessagesError.RECORD_NOT_FOUND, id),
      );

    record.description = dto.description;
    record.updatedAt = new Date();

    const response = await this.recordRepository.save(record);

    return new RecordResponseDto(response);
  }
}
