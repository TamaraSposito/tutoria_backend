import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomDto } from '@app/room/dto/room.dto';
export class UpdateRoomDto extends RoomDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public active: boolean | null;
}
