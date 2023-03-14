import { forwardRef, Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Task } from '../assignment/task.model';
import { Report } from './report.model';
import { ReportsUsers } from './reports.users.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([Report, User, Task, ReportsUsers]),
  ],
})
export class ReportsModule {}
