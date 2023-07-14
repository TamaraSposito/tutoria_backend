import {IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordUserDto {
    @ApiProperty()
    @IsString()
    public password: string;

    @ApiProperty()
    @IsString()
    public newPassword: string;
}
