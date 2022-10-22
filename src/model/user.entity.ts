import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserMatchBet } from './userMatchBet.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  username: string;
  @Column({ type: 'boolean', default: false })
  isPaid: boolean;
  @Column({ type: 'varchar', length: 300, nullable: true })
  paidReceipt: string | null;
  @OneToMany(() => UserMatchBet, (userMatchBet) => userMatchBet.user)
  matchBets: UserMatchBet[];
}
