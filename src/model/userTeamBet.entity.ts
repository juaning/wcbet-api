import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_team_bet' })
export class UserTeamBet extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  teamId: string;
  @Column({ type: 'int' })
  instance: number;
}
