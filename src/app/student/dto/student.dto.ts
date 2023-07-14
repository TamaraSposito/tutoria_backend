import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class StudentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  public name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  public sponsor: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  @IsOptional()
  public sponsorMail: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsOptional()
  public sponsorPhone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public birthday: string;

  @ApiProperty()
  @IsString()
  public roomId: string;
}
