import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { Role } from '@shared/enums/role.enum';
export class UserDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(200)
  public mail: string;

  @ApiProperty()
  @IsEnum(Role)
  public role: Role;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  public name: string = null;
}
