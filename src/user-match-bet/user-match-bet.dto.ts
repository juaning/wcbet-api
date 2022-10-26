import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/user.decorator';
import { UserMatchBet } from 'src/model/userMatchBet.entity';

export class UserMatchBetDTO implements Readonly<UserMatchBetDTO> {
  @ApiProperty({ type: String, required: true })
  @IsString()
  matchId: string;
  @ApiProperty({ type: Number, default: 0 })
  awayScore: number;
  @ApiProperty({ type: Number, default: 0 })
  homeScore: number;

  public static from(dto: Partial<UserMatchBetDTO>) {
    const bet = new UserMatchBetDTO();
    bet.matchId = dto.matchId;
    bet.awayScore = dto.awayScore;
    bet.homeScore = dto.homeScore;
    return bet;
  }

  public static fromEntity(entity: UserMatchBet) {
    return this.from({
      matchId: entity.matchId,
      awayScore: entity.awayScore,
      homeScore: entity.homeScore,
    });
  }

  public toEntity(user: User = null) {
    const bet = new UserMatchBet();
    bet.matchId = this.matchId;
    bet.awayScore = this.awayScore;
    bet.homeScore = this.homeScore;
    bet.createDateTime = new Date();
    bet.createdBy = user ? user.id : null;
    bet.lastChangedBy = user ? user.id : null;
    return bet;
  }
}
