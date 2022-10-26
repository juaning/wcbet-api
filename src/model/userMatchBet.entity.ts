import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_match_bet' })
export class UserMatchBet extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  matchId: string;
  @Column({ type: 'int' })
  awayScore: number;
  @Column({ type: 'int' })
  homeScore: number;
}
