import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsString()
  @IsEmail({})
  email: string;
  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsString()
  @Length(4, 16)
  password: string;
}
