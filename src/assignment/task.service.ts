import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';
import { UsersService } from '../users/users.service';
import { Op } from 'sequelize';

@Injectable()
export class TaskService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @InjectModel(Task) private readonly taskRepository: typeof Task,
  ) {}
  async getAll() {
    try {
      const tasks = await this.taskRepository.findAll({
        include: { all: true },
      });
      return tasks;
    } catch (e) {
      throw new HttpException('таски не найдены', HttpStatus.BAD_REQUEST);
    }
  }

  async create({ userList, ...rest }: CreateTaskDto) {
    try {
      const users = await this.userService.findByIdArr(userList);

      const task = await this.taskRepository.create({
        ...rest,
      });
      await task.$set('userList', users);
      return task.reload({ include: { all: true } });
    } catch (e) {
      throw new HttpException("task can't created", HttpStatus.BAD_REQUEST);
    }
  }

  async findByIdArr(taskIdArr?: number[]) {
    try {
      return await this.taskRepository.findAll({
        where: {
          id: {
            [Op.in]: taskIdArr ? taskIdArr : [],
          },
        },
        attributes: ['id'],
      });
    } catch (e) {
      throw new HttpException('roles not found', HttpStatus.NOT_FOUND);
    }
  }
}
