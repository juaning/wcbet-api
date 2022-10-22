import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user.decorator';
import { UserMatchBetDTO } from './user-match-bet.dto';
import { UserMatchBetService } from './user-match-bet.service';

@Controller('user-match-bet')
@ApiTags('user-match-bet')
export class UserMatchBetController {
  constructor(private serv: UserMatchBetService) {}

  // @Get()
  // @ApiOkResponse({
  //   description: 'Users match bets retrieved successfully.',
  //   type: UserMatchBetDTO,
  //   isArray: true,
  // })
  // public async getAll(): Promise<UserMatchBetDTO[]> {
  //   return await this.serv.getAll();
  // }

  @Get()
  @ApiOkResponse({
    description: 'User match bets retrieved successfully.',
    type: UserMatchBetDTO,
    isArray: true,
  })
  public async getMatchBetsByUser(
    @User() user: User,
  ): Promise<UserMatchBetDTO[]> {
    return await this.serv.getMatchBetByUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'User match bet created successfully.',
    type: UserMatchBetDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorizaed.',
  })
  @Post()
  public async post(
    @User() user: User,
    @Body() dto: UserMatchBetDTO,
  ): Promise<UserMatchBetDTO> {
    return this.serv.create(dto, user);
  }
}
