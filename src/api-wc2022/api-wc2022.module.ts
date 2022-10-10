import { Module } from '@nestjs/common';
import { ApiWc2022Service } from './api-wc2022.service';
import { ApiWc2022Controller } from './api-wc2022.controller';

@Module({
  providers: [ApiWc2022Service],
  controllers: [ApiWc2022Controller],
  exports: [ApiWc2022Service],
})
export class ApiWc2022Module {}
