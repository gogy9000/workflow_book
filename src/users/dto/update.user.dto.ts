import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsString()
  @IsEmail({})
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsString()
  @Length(4, 16)
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'false', description: 'забанен ли юзер' })
  @IsBoolean()
  @IsOptional()
  baned: boolean;

  @ApiProperty({
    example: 'because user motherfucker',
    description: 'banned because he is motherfucker',
  })
  @IsString()
  @IsOptional()
  banReason: string;

  @ApiProperty({
    example: [1, 2, 3, 4, 5],
    description: 'массив id ролей',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  roles: number[];

  @ApiProperty({
    example: [1, 2, 3, 4, 5],
    description: 'массив id задач',
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  tasks: number[];
}
