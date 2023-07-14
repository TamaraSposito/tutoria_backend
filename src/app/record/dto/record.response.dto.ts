import { BaseDto } from '@shared/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Record } from '@app/record/model/record.model';

export class RecordResponseDto extends BaseDto {
  @ApiProperty()
  public description: string;

  @ApiProperty()
  public studentId: string;

  @ApiProperty()
  public userId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  constructor(record: Record) {
    super(record);

    this.id = record.id;
    this.description = record.description;
    this.createdAt = record.createdAt;
    this.updatedAt = record.updatedAt;
    this.userId = record.user.id;
    this.studentId = record.student.id;
  }
}
