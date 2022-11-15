import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'user_match_bet' })
@Unique(['matchId', 'createdBy'])
export class UserMatchBet extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  matchId: string;
  @Column({ type: 'int' })
  awayScore: number;
  @Column({ type: 'int' })
  homeScore: number;
}
