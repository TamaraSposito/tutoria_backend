import { BaseDto } from '@shared/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Room } from '@app/room/model/room.model';

export class RoomResponseDto extends BaseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public description: string;
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  constructor(room: Room) {
    super(room);
    this.id = room.id;
    this.description = room.description;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}
