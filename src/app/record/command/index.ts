import { UpdateRecordDto } from '@app/record/dto/update-record.dto';
import { CreateRecordDto } from '@app/record/dto/create-record.dto';

export class CreateRecordCommand {
  constructor(public readonly dto: CreateRecordDto) {}
}

export class UpdateRecordCommand {
  constructor(
    public readonly dto: UpdateRecordDto,
    public readonly id: string,
  ) {}
}

export class DeleteRoomCommand {
  constructor(public readonly id: string) {}
}
