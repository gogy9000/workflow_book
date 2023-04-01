import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
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
  async getAll(id?: number, category?: 'issued' | 'received' | 'responsible') {
    try {
      const options: Record<string, any> = {};
      if (id && category === 'issued') {
        options['$author.id$'] = id;
      }

      if (id && category === 'responsible') {
        options.reportOfficerId = id;
      }

      if (id && category === 'received') {
        options['$userList.id$'] = { [Op.in]: [id] };
      }

      const tasks = await this.taskRepository.findAll({
        include: { all: true },
        where: options,
      });
      return tasks;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findById(id: string) {
    try {
      return await this.taskRepository.findByPk(id, {
        include: { all: true },
      });
    } catch (e) {
      throw new NotFoundException({ message: e.message });
    }
  }

  async create(id: number, { userList, ...rest }: CreateTaskDto) {
    try {
      const users = await this.userService.findByIdArr(userList);
      const task = await this.taskRepository.create({
        ...rest,
        authorId: id,
      });
      await task.$set('userList', users);
      return task.reload({ include: { all: true } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: number, { userList, ...rest }: CreateTaskDto) {
    try {
      const task = await this.taskRepository.findByPk(id, {
        include: { all: true },
      });
      if (userList) {
        const users = await this.userService.findByIdArr(userList);
        await task.$set('userList', users);
      }
      await task.set(rest);
      await task.save();
      return await task.reload({ include: { all: true } });
    } catch (e) {}
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
