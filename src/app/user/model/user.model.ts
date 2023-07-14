import { BeforeInsert, Column, Entity } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Role } from '@shared/enums/role.enum';
import { BaseModel } from '@shared/model/base.model';
@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'varchar', name: 'mail', length: 200 })
  public mail: string;

  @Column({ type: 'enum', name: 'role', enum: Role, default: Role.User })
  public role: Role;

  @Column({ type: 'varchar', name: 'name', length: 200 })
  public name: string;

  @Column({ name: 'created_at', type: 'date' })
  public createdAt: Date;

  @Column({ name: 'updated_at', type: 'date', nullable: true })
  public updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'date', nullable: true })
  public deleteAt: Date;

  @Column({ name: 'block', type: 'boolean', default: false })
  public block: boolean;

  @Column({ name: 'password', type: 'varchar' })
  password: string;
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
  sstPassword(password){
    this.password = hashSync(password, 10);
  }
}
