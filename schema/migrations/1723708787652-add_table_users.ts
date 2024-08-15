import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1723708787652 implements MigrationInterface {
  name = 'Test1723708787652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_code" character varying(20) NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL DEFAULT \'0\', "stock" integer NOT NULL DEFAULT \'0\', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "UQ_70b3f77ca8de13149b7f08d725c" UNIQUE ("product_code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_code" character varying(20) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying NOT NULL, "role" character varying(50) NOT NULL DEFAULT \'common\', "avatar" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23351656ab098559729ac15f50a" UNIQUE ("user_code"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"',
    );
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "products"');
  }
}
