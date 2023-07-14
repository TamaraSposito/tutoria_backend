import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class recod1681171453159 implements MigrationInterface {
  tableName = 'records';
  indexId = 'INDEX_RECORDS_ID';

  foreignKeyStudents = 'FK_RECORDOS_STUDENTS';
  foreignKeyUser = 'FK_RECORDOS_USERS';
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
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'student_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'datetime',
          },
          {
            name: 'updated_at',
            isNullable: true,
            type: 'datetime',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        name: this.foreignKeyStudents,
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: this.foreignKeyUser,
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
    await queryRunner.dropForeignKey(this.tableName, this.foreignKeyUser);
    await queryRunner.dropForeignKey(this.tableName, this.foreignKeyStudents);
    await queryRunner.dropTable(this.tableName);
  }
}
