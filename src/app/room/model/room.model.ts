import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '@shared/model/base.model';
import { Student } from '@app/student/model/student.model';

@Entity('rooms')
export class Room extends BaseModel {
  @Column({ name: 'description', type: 'varchar', length: 200 })
  public description: string;

  @Column({ name: 'created_at', type: 'date' })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @OneToMany(() => Student, (student) => student.room)
  public students: Student[];

}
