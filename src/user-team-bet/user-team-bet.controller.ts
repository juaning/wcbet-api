import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user.decorator';
import { UserTeamBetDTO } from './user-team-bet.dto';
import { UserTeamBetService } from './user-team-bet.service';

@Controller('user-team-bet')
@ApiTags('user-team-bet')
export class UserTeamBetController {
  constructor(private serv: UserTeamBetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({
    description: 'User team bets retrieved successfully.',
    type: UserTeamBetDTO,
    isArray: true,
  })
  public async getTeamBetsByUser(
    @User() user: User,
  ): Promise<UserTeamBetDTO[]> {
    return await this.serv.getTeamBetsByUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'User Team Bet created.',
    type: UserTeamBetDTO,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized.' })
  @ApiBadRequestResponse({
    description: 'Bad request. Something is malformed.',
  })
  @Post()
  public async post(
    @User() user: User,
    @Body() dto: UserTeamBetDTO,
  ): Promise<UserTeamBetDTO> {
    return this.serv.create(dto, user);
  }
}
