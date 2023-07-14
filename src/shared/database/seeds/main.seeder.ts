import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import userFactory from '@shared/database/factories/user.factory';
import { FactorySeeder } from '@shared/database/seeds/factory.seeder';
import { AdminSeeder } from '@shared/database/seeds/admin.seeder';
export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [AdminSeeder, FactorySeeder],
      factories: [userFactory],
    });
  }
}
