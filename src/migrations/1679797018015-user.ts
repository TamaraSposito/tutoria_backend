import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class user1679797018015 implements MigrationInterface {
  tableName = 'users';
  indexId = 'INDEX_USERS_ID';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'role',
            length: '50',
            type: 'varchar',
          },
          {
            name: 'mail',
            length: '200',
            type: 'varchar',
          },
          {
            name: 'name',
            length: '200',
            type: 'varchar',
          },
          {
            name: 'password',
            length: '200',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'date',
          },
          {
            name: 'updated_at',
            isNullable: true,
            type: 'date',
          },
          {
            name: 'deleted_at',
            isNullable: true,
            type: 'date',
          },
          {
            name: 'block',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: this.indexId,
        columnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tableName, this.indexId);
    await queryRunner.dropTable(this.tableName);
  }
}
