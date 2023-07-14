import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class RecordDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  public description: string;
}
