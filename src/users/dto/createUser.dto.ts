import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  password: string;
}
