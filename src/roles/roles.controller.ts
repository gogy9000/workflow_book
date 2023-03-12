import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './role.model';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiOperation({ summary: 'добавить роль' })
  @ApiResponse({ type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }
  @ApiOperation({ summary: 'получить сущность роли' })
  @ApiResponse({ type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    console.log(value);
    return this.rolesService.getByValue(value);
  }
}
