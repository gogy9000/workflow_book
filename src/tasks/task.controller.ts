import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../auth/role.auth.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Task } from './task.model';
import { User } from '../users/decorators/user.decorator';
@ApiTags('Task')
@ApiBearerAuth('JWT-auth')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiOperation({ summary: 'показать все задания' })
  @ApiResponse({ status: 200, type: [Task] })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'показать задания по категориям' })
  @ApiResponse({ status: 200, type: [Task] })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get('/:category')
  findByCategory(
    @User('id') id: number,
    @Param('category') category: 'issued' | 'received' | 'responsible',
  ) {
    return this.taskService.getAll(id, category);
  }

  @ApiOperation({ summary: 'показать задание' })
  @ApiResponse({ status: 200, type: Task })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get('/task/:id')
  findById(@Param('id') id) {
    return this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'создать задание' })
  @ApiResponse({ status: 200, type: Task })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Post()
  create(@User('id') id: number, @Body() dto: CreateTaskDto) {
    return this.taskService.create(id, dto);
  }

  @ApiOperation({ summary: 'обновить задание' })
  @ApiResponse({ status: 200, type: Task })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: CreateTaskDto) {
    return this.taskService.update(id, dto);
  }
}
