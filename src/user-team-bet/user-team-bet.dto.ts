import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { User } from 'src/user.decorator';
import { UserTeamBet } from 'src/model/userTeamBet.entity';
import { TeamBetTypeEnum } from 'src/config/common';

export class UserTeamBetDTO implements Readonly<UserTeamBetDTO> {
  @ApiProperty({ type: String, required: true })
  @IsString()
  teamId: string;
  @ApiProperty({ type: Number, required: true })
  @IsEnum(TeamBetTypeEnum)
  instance: TeamBetTypeEnum;

  public static from(dto: Partial<UserTeamBetDTO>) {
    const bet = new UserTeamBetDTO();
    bet.teamId = dto.teamId;
    bet.instance = dto.instance;
    return bet;
  }

  public static fromEntity(entity: UserTeamBet) {
    return this.from({
      teamId: entity.teamId,
      instance: entity.instance,
    });
  }

  public toEntity(user: User = null) {
    const bet = new UserTeamBet();
    bet.teamId = this.teamId;
    bet.instance = this.instance;
    bet.createDateTime = new Date();
    bet.createdBy = user ? user.id : null;
    bet.lastChangedBy = user ? user.id : null;
    return bet;
  }
}
