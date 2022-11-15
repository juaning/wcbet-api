import { MigrationInterface, QueryRunner } from "typeorm";

export class addGroupMatchTeamBet1668259877659 implements MigrationInterface {
    name = 'addGroupMatchTeamBet1668259877659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_team_bet" ADD "groupId" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "user_team_bet" ADD "matchId" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_team_bet" DROP COLUMN "matchId"`);
        await queryRunner.query(`ALTER TABLE "user_team_bet" DROP COLUMN "groupId"`);
    }

}
