import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { Role } from '@shared/enums/role.enum';
export class RoomDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  public description: string = null;
}
