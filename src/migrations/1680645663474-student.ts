import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class student1680645663474 implements MigrationInterface {
  tableName = 'students';
  indexId = 'INDEX_STUDENTS_ID';

  foreignKey = 'FK_ROOMS_STUDENTS';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'sponsor',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'sponsor_mail',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'sponsor_phone',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'birthday',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'room_id',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rooms',
        name: this.foreignKey,
      }),
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
    await queryRunner.dropForeignKey(this.tableName, this.foreignKey);
    await queryRunner.dropTable(this.tableName);
  }
}
