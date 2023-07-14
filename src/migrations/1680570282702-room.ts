import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class room1680570282702 implements MigrationInterface {
  tableName = 'rooms';
  indexId = 'INDEX_ROOMS_ID';
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
            name: 'description',
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
