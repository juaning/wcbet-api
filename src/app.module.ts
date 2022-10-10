import { Module } from '@nestjs/common';
import { ApiWc2022Module } from './api-wc2022/api-wc2022.module';

@Module({
  imports: [ApiWc2022Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
