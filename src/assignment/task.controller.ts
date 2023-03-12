import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../auth/role.auth.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Task } from './task.model';
@ApiTags('Task')
@ApiBearerAuth('JWT-auth')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @ApiOperation({ summary: 'показать все задания' })
  @ApiResponse({ status: 200, type: [Task] })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'создать задание' })
  @ApiResponse({ status: 200, type: Task })
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
}
