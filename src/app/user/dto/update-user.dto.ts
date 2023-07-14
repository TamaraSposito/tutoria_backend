import { UserDto } from '@app/user/dto/user.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends UserDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public block: boolean | null;
}
