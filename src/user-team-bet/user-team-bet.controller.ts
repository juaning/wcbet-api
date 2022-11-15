import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user.decorator';
import { CreateUserTeamBetDTO, UserTeamBetDTO } from './user-team-bet.dto';
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
  @Get(':id')
  @ApiOkResponse({
    description: 'User team bet retrieved successfully.',
    type: UserTeamBetDTO,
  })
  public async getTeamBetsById(
    @Param('id') id: string,
    @User() user: User,
  ): Promise<UserTeamBetDTO> {
    return await this.serv.getTeamBetById(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'User team instance bet retrieved successfully.',
    type: UserTeamBetDTO,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized.' })
  @Get('instance/:instance')
  public async getTeamBetsByInstanceAndUser(
    @Param('instance') instance: number,
    @User() user: User,
  ): Promise<UserTeamBetDTO[]> {
    try {
      return this.serv.getTeamBetByInstanceAndUser(instance, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'User team bets fetched successfully',
    type: UserTeamBetDTO,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized.' })
  @Get('group/:groupId')
  public async getTeamBetsByGroupId(
    @Param('groupId') groupId: string,
    @User() user: User,
  ): Promise<Array<UserTeamBetDTO>> {
    try {
      return this.serv.getTeamBetsByGroupId(groupId, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'User team bet fetched successfully',
    type: UserTeamBetDTO,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized.' })
  @Get('match/:matchId')
  public async getTeamBetByMatchId(
    @Param('matchId') matchId: string,
    @User() user: User,
  ): Promise<UserTeamBetDTO> {
    try {
      return this.serv.getTeamBetByMatchId(matchId, user);
    } catch (err) {
      throw err;
    }
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
    @Body() dto: CreateUserTeamBetDTO,
  ): Promise<UserTeamBetDTO> {
    try {
      return this.serv.create(dto, user);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'User Team Bet updated.',
    type: UserTeamBetDTO,
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized.' })
  @ApiBadRequestResponse({
    description: 'Bad request. Something is malformed.',
  })
  @Put()
  public async update(
    @User() user: User,
    @Body() dto: UserTeamBetDTO,
  ): Promise<UserTeamBetDTO> {
    try {
      await this.serv.update(dto, user);
      return dto;
    } catch (error) {
      throw error;
    }
  }
}
