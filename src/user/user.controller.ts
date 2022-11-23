import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { HttpServiceInterceptor } from '../api-wc2022/api-wc2022-interceptor.service';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { ApiWc2022Service } from '../api-wc2022/api-wc2022.service';

@UseInterceptors(HttpServiceInterceptor)
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private serv: UserService,
    private readonly apiWC2022Service: ApiWc2022Service,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
    type: UserDTO,
    isArray: true,
  })
  public async getAll(): Promise<UserDTO[]> {
    return await this.serv.getAll();
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('allUsers')
  @CacheTTL(300)
  @Get('/all')
  public async getAllUsers(): Promise<any> {
    return await this.serv.getAllUsers();
  }

  @Post()
  public async post(
    @Body() dto: UserDTO,
    @Body('userId') userId: string,
  ): Promise<UserDTO> {
    return this.serv.create(dto, userId);
  }
}
