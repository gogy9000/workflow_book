import { forwardRef, Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Task } from './task.model';
import { TaskUser } from './task.user.model';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user.roles.model';
import { Report } from '../reports/report.model';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Task, TaskUser, Role, UserRoles, Report]),
  ],
  exports: [TaskService],
})
export class TaskModule {}
