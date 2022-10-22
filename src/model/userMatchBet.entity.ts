import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'user_match_bet' })
export class UserMatchBet extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  matchId: string;
  @Column({ type: 'int' })
  awayScore: number;
  @Column({ type: 'int' })
  homeScore: number;
  @ManyToOne(() => User, (user) => user.matchBets)
  user: User;
}
