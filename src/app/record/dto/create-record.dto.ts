import { RecordDto } from '@app/record/dto/record.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRecordDto extends RecordDto {
  @ApiProperty()
  @IsString()
  public studentId: string;
}
