import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
interface JobOrderCreation {
  title: string;
}
@Table({ tableName: 'job-orders' })
export class JobOrder extends Model<JobOrder, JobOrderCreation> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'creation',
  })
  phase: 'creation' | 'ready';
}
