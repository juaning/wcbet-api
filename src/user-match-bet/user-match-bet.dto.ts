import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/model/user.entity';
import { UserMatchBet } from 'src/model/userMatchBet.entity';

export class UserMatchBetDTO implements Readonly<UserMatchBetDTO> {
  @ApiProperty({ type: String, required: true })
  @IsUUID()
  id: string;
  @ApiProperty({ type: String, required: true })
  @IsString()
  matchId: string;
  @ApiProperty({ type: Number, default: 0 })
  awayScore: number;
  @ApiProperty({ type: Number, default: 0 })
  homeScore: number;

  public static from(dto: Partial<UserMatchBetDTO>) {
    const bet = new UserMatchBetDTO();
    bet.id = dto.id;
    bet.matchId = dto.matchId;
    bet.awayScore = dto.awayScore;
    bet.homeScore = dto.homeScore;
    return bet;
  }

  public static fromEntity(entity: UserMatchBet) {
    return this.from({
      id: entity.id,
      matchId: entity.matchId,
      awayScore: entity.awayScore,
      homeScore: entity.homeScore,
    });
  }

  public toEntity(user: User = null) {
    const bet = new UserMatchBet();
    bet.id = this.id;
    bet.matchId = this.matchId;
    bet.awayScore = this.awayScore;
    bet.homeScore = this.homeScore;
    bet.createDateTime = new Date();
    bet.createdBy = user ? user.id : null;
    bet.lastChangedBy = user ? user.id : null;
    return bet;
  }
}
