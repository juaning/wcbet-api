import { MigrationInterface, QueryRunner } from "typeorm";

export class userMatchBet1666444948249 implements MigrationInterface {
    name = 'userMatchBet1666444948249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_match_bet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "matchId" character varying(300) NOT NULL, "awayScore" integer NOT NULL, "homeScore" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_44b4b48fb702a7161ec2f56bde1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_match_bet" ADD CONSTRAINT "FK_138cc1fd92854f10d2ce34b2f38" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_match_bet" DROP CONSTRAINT "FK_138cc1fd92854f10d2ce34b2f38"`);
        await queryRunner.query(`DROP TABLE "user_match_bet"`);
    }

}
