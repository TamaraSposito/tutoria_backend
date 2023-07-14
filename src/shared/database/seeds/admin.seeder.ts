import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@app/user/model/user.model';

import { Role } from '@shared/enums/role.enum';
export class AdminSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const user = new User();
    user.name = 'Admin';
    user.mail = user.password = 'admin@admin.com';
    user.role = Role.Admin;
    user.createdAt = new Date();

    const userExists = await userRepository.findOneBy({
      mail: user.mail,
    });

    if (!userExists) await userRepository.save(user);
  }
}
