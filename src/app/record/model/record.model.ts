import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '@shared/model/base.model';
import { User } from '@app/user/model/user.model';
import { Student } from '@app/student/model/student.model';
@Entity('records')
export class Record extends BaseModel {
  @Column({ type: 'varchar', name: 'description' })
  public description: string;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Student, (student) => student.id)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'created_at', type: 'datetime' })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', nullable: true })
  public updatedAt: Date;
}
