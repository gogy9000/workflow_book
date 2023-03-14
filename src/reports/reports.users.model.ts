import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Report } from './report.model';

@Table({ tableName: 'reports_users', createdAt: false, updatedAt: false })
export class ReportsUsers extends Model<ReportsUsers> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Report)
  @Column({
    type: DataType.INTEGER,
  })
  reportId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
