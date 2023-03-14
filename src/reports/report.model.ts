import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { ReportsUsers } from './reports.users.model';
import { Task } from '../assignment/task.model';

interface ReportCreation {
  title: string;
  location: string;
  description: string;
  userList: User[];
}

@Table({ tableName: 'report' })
export class Report extends Model<Report, ReportCreation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'no name',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'no name',
  })
  location: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'no name',
  })
  description: string;

  @BelongsToMany(() => User, () => ReportsUsers)
  userList: User[];

  @BelongsTo(() => Task)
  task: Task;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  taskId: number;
}
