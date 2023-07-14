import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '@shared/model/base.model';
import { Room } from '@app/room/model/room.model';
@Entity('students')
export class Student extends BaseModel {
  @Column({ type: 'varchar', name: 'name', length: 200 })
  public name: string;

  @Column({ type: 'varchar', name: 'sponsor', length: 200 })
  public sponsor: string;

  @Column({
    type: 'varchar',
    name: 'sponsor_mail',
    length: 200,
    nullable: true,
  })
  public sponsorMail: string;

  @Column({
    type: 'varchar',
    name: 'sponsor_phone',
    length: 50,
    nullable: true,
  })
  public sponsorPhone: string;

  @Column({ type: 'varchar', name: 'birthday', nullable: true })
  public birthday: string;

  @Column({ type: 'varchar', name: 'room_id', nullable: true })
  public roomId: string;

  @ManyToOne(() => Room, (room) => room.students)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'created_at', type: 'date' })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;
}
