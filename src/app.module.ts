import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiWc2022Module } from './api-wc2022/api-wc2022.module';
import { configService } from './config/config.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ApiWc2022Module,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
