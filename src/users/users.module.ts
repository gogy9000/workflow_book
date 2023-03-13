import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user.roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Task } from '../assignment/task.model';
import { TaskUser } from '../assignment/task.user.model';
import { TaskModule } from '../assignment/task.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => TaskModule),
    forwardRef(() => RolesModule),
    SequelizeModule.forFeature([User, Role, UserRoles, Task, TaskUser]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
