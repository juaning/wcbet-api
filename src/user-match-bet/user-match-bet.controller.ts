import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/user.decorator';
import { UserMatchBetDTO } from './user-match-bet.dto';
import { UserMatchBetService } from './user-match-bet.service';

@Controller('user-match-bet')
export class UserMatchBetController {
  constructor(private serv: UserMatchBetService) {}

  @Get()
  public async getAll(): Promise<UserMatchBetDTO[]> {
    return await this.serv.getAll();
  }

  // @Post()
  // public async post(
  //   @Body() dto: UserMatchBetDTO,
  // ): Promise<UserMatchBetDTO> {
  //   return this.serv.create(dto, user);
  // }
}
