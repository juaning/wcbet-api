import { MigrationInterface, QueryRunner } from "typeorm";

export class discontinueUser1666798127942 implements MigrationInterface {
    name = 'discontinueUser1666798127942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_match_bet" DROP CONSTRAINT "FK_138cc1fd92854f10d2ce34b2f38"`);
        await queryRunner.query(`ALTER TABLE "user_match_bet" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_match_bet" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_match_bet" ADD CONSTRAINT "FK_138cc1fd92854f10d2ce34b2f38" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
