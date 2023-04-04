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
import { Task } from '../tasks/task.model';
import { ApiProperty } from '@nestjs/swagger';

interface ReportCreation {
  title: string;
  location: string;
  description: string;
  userList: User[];
  authorId: number;
}

@Table({ tableName: 'report' })
export class Report extends Model<Report, ReportCreation> {
  @ApiProperty({ type: Number, description: 'id', example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'название отчета',
    example: 'какой то отчет',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'название локации',
    example: 'какая то локация',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  location: string;

  @ApiProperty({
    type: String,
    description: 'непосредственно отчет',
    example: 'какой то отчет',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  description: string;

  @ApiProperty({ type: String, examples: ['creation', 'ready'] })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'creation',
  })
  phase: 'creation' | 'ready';

  @ApiProperty({
    description: 'участвующие в задании',
    type: () => [User],
  })
  @BelongsToMany(() => User, () => ReportsUsers)
  userList: User[];

  @ApiProperty({ type: () => Task })
  @BelongsTo(() => Task)
  task: Task;

  @ApiProperty({ type: Number })
  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  taskId: number;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ type: Number })
  @ForeignKey(() => User)
  authorId: number;
}
