import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'какая то таска', description: 'название таски' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'в каком то месте', description: 'название места' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    example: 'какое то описание задания',
    description: 'непосредственно задание',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: [1, 32, 56], description: 'id выполняющих задание' })
  @IsNumber({}, { each: true })
  @IsOptional()
  userList: number[];

  @ApiProperty({ example: 45, description: 'id ответственного за выполнение' })
  @IsNumber()
  @IsOptional()
  reportOfficerId: number;
}
