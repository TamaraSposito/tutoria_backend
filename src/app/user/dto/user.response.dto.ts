import { BaseDto } from '@shared/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/user/model/user.model';
import { Role } from '@shared/enums/role.enum';

export class UserResponseDto extends BaseDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public mail: string;

  @ApiProperty()
  public role: Role;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public deletedAt: Date;

  @ApiProperty()
  public block: boolean;

  constructor(user: User) {
    super(user);

    this.id = user.id;
    this.mail = user.mail;
    this.role = user.role;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deleteAt;
    this.block = user.block;
  }
}
