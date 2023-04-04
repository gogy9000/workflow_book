import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Task } from './task.model';

@Table({ tableName: 'task_user', createdAt: false, updatedAt: false })
export class TaskUser extends Model<TaskUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.INTEGER,
  })
  taskId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
