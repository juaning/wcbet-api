import { MigrationInterface, QueryRunner } from "typeorm";

export class updateMatchBetKeyContrains1667510723155 implements MigrationInterface {
    name = 'updateMatchBetKeyContrains1667510723155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_match_bet" ADD CONSTRAINT "UQ_2a3fc0ecb968870f649a36ccb8e" UNIQUE ("matchId", "createdBy")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_match_bet" DROP CONSTRAINT "UQ_2a3fc0ecb968870f649a36ccb8e"`);
    }

}
