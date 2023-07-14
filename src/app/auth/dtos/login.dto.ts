import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  mail: string;

  @ApiProperty()
  @IsString()
  password: string;
}
