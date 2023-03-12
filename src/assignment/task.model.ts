import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { TaskUser } from './task.user.model';

interface TaskCreation {
  title: string;
  location: string;
  description: string;
  userList: User[];
}
@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreation> {
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

  @BelongsToMany(() => User, () => TaskUser)
  userList: User[];
}
