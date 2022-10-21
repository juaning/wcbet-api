import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async getAll(): Promise<UserDTO[]> {
    return await this.repo
      .find()
      .then((users) => users.map((user) => UserDTO.fromEntity(user)));
  }

  public async create(dto: UserDTO, userId: string): Promise<UserDTO> {
    return this.repo
      .save(dto.toEntity(userId))
      .then((e) => UserDTO.fromEntity(e));
  }
}
