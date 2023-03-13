import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';
import { Roles } from '../auth/role.auth.decorator';
import { RoleGuard } from '../auth/role.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @ApiOperation({ summary: 'создать юзера' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'обновить юзера' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.findByIdAndPut(id, dto);
  }
  @ApiOperation({ summary: 'добавить к существующим полям юзера' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Patch('/:id')
  add(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.findByIdAndPatch(id, dto);
  }

  @ApiOperation({ summary: 'вывести всех юзеров' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'дать роль юзеру' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'забанить гада' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
