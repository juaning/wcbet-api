import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserMatchBet } from 'src/model/userMatchBet.entity';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
    type: UserDTO,
    isArray: true,
  })
  public async getAll(): Promise<UserDTO[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(
    @Body() dto: UserDTO,
    @Body('userId') userId: string,
  ): Promise<UserDTO> {
    return this.serv.create(dto, userId);
  }

  @Get('matchBets')
  getMatchBets(@Body('userId') userId: string): Promise<UserMatchBet[]> {
    return this.serv.getMatchBetsOfUser(userId);
  }
}
