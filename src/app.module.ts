import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { UserRoles } from './roles/user.roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TaskModule } from './assignment/task.module';
import { TaskUser } from './assignment/task.user.model';
import { Task } from './assignment/task.model';

@Module({
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, TaskUser, Task],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    // PostsModule,
    TaskModule,
  ],
})
export class AppModule {}
