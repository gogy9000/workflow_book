import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user.roles.model';
import { Task } from '../assignment/task.model';
import { TaskUser } from '../assignment/task.user.model';
import { ReportsUsers } from '../reports/reports.users.model';
import { Report } from '../reports/report.model';

interface UserCreationAttrs {
  email: string;
  password;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'is banned' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({
    example: 'because user motherfucker',
    description: 'banned because he is motherfucker',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Task, {
    as: 'author',
    foreignKey: 'authorId',
  })
  managedTasks: Task[];

  @HasMany(() => Task, {
    as: 'reportOfficer',
    foreignKey: 'reportOfficerId',
  })
  responsibleTask: Task[];

  @HasMany(() => Report)
  managedReports: Report[];

  @BelongsToMany(() => Task, () => TaskUser)
  tasks: Task[];

  @BelongsToMany(() => Report, () => ReportsUsers)
  reports: Report[];
}
