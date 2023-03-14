import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ example: 'какая то отчет', description: 'название отчета' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'в каком то месте', description: 'название места' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    example: 'какое то описание отчета',
    description: 'непосредственно отчет',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: [1, 32, 56], description: 'id выполнивших задание' })
  @IsNumber({}, { each: true })
  @IsOptional()
  userList: number[];

  @ApiProperty({ example: 1, description: 'id задания' })
  @IsNumber()
  taskId: number;
}
