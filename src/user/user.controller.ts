import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
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
}
