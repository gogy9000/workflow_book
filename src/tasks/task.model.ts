import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { TaskUser } from './task.user.model';
import { Report } from '../reports/report.model';
import { ApiProperty } from '@nestjs/swagger';

interface TaskCreation {
  title: string;
  location: string;
  description: string;
  userList: User[];
  authorId: number;
}
@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreation> {
  @ApiProperty({ type: Number, example: 'id задания' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ type: Number, example: 'название задания' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  title: string;

  @ApiProperty({ type: String, example: 'место исполнения' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  location: string;

  @ApiProperty({ type: String, example: 'задание' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'creation',
  })
  phase: 'creation' | 'ready';

  @ApiProperty({ type: () => User, description: 'ответственные за работу' })
  @BelongsToMany(() => User, () => TaskUser)
  userList: User[];

  @ApiProperty({ type: () => Report, description: 'отчет' })
  @HasOne(() => Report)
  report: Report;

  @ApiProperty({ type: () => User, description: 'ответственный за отчет' })
  @BelongsTo(() => User, { foreignKey: 'reportOfficerId' })
  reportOfficer: User;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User, { foreignKey: 'authorId' })
  author: User;

  @HasMany(() => Task, { foreignKey: 'overTaskId' })
  subTasks: Task[];

  @BelongsTo(() => Task, { foreignKey: 'overTaskId' })
  overTask: Task;
}
