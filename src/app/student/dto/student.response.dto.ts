import { BaseDto } from '@shared/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@app/student/model/student.model';
import { Room } from '@app/room/model/room.model';

export class StudentResponseDto extends BaseDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public sponsor: string;

  @ApiProperty()
  public sponsorMail: string;

  @ApiProperty()
  public sponsorPhone: string;

  @ApiProperty()
  public birthday: string;

  @ApiProperty()
  public roomId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public room: Room;

  constructor(student: Student) {
    super(student);

    this.id = student.id;
    this.name = student.name;
    this.sponsor = student.sponsor ? student.sponsor: "" ;
    this.sponsorMail = student.sponsorMail ? student.sponsorMail: "";
    this.sponsorPhone = student.sponsorPhone ? student.sponsorPhone: "";
    this.birthday = student.birthday ? student.birthday.toString() : "";
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
    this.roomId = student.roomId;
    this.room = student.room;
  }
}
