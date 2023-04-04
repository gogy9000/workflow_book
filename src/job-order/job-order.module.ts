import { Module } from '@nestjs/common';
import { JobOrderController } from './job-order.controller';
import { JobOrderService } from './job-order.service';

@Module({
  controllers: [JobOrderController],
  providers: [JobOrderService],
})
export class JobOrderModule {}
