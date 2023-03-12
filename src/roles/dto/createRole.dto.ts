import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ type: String, example: 'USER', description: 'название роли' })
  @IsString()
  readonly value: string;
  @IsString()
  @ApiProperty({
    type: String,
    example: 'юзер имеет такие то такие то права и ограничения',
    description: 'описание роли',
  })
  readonly description: string;
}
