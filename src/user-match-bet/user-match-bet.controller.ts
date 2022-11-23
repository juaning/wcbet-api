import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from 'src/user.decorator';
import { UserMatchBetDTO } from './user-match-bet.dto';
import { UserMatchBetService } from './user-match-bet.service';
import { HttpServiceInterceptor } from '../api-wc2022/api-wc2022-interceptor.service';
import { ApiWc2022Service } from '../api-wc2022/api-wc2022.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('user-match-bet')
@ApiTags('user-match-bet')
export class UserMatchBetController {
  constructor(
    private serv: UserMatchBetService,
    private readonly apiWC2022Service: ApiWc2022Service,
  ) {}

  @UseGuards(AuthGuard('jwt'))
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

  /**
   * Bet on a match
   * @param user User who created the bet
   * @param dto Bet info
   * @returns object with bet info
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'User match bet created successfully.',
    type: UserMatchBetDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorizaed.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Something is malformed',
  })
  @Post()
  public async post(
    @User() user: User,
    @Body() dto: UserMatchBetDTO,
  ): Promise<UserMatchBetDTO> {
    try {
      return this.serv.create(dto, user);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    description: 'User match bet update successfully.',
    type: UserMatchBetDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not authorizaed.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Something is malformed',
  })
  @Put(':id')
  public update(
    @Param('id') id: string,
    @User() user: User,
    @Body() dto: UserMatchBetDTO,
  ) {
    try {
      return this.serv.update(id, dto, user);
    } catch (err) {
      throw err;
    }
  }
}
