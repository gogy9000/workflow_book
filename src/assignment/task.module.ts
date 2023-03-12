import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Task } from './task.model';
import { TaskUser } from './task.user.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    AuthModule,
    UsersModule,
    SequelizeModule.forFeature([User, Task, TaskUser]),
  ],
})
export class TaskModule {}
