import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Op } from 'sequelize';
import { UpdateUserDto } from './dto/update.user.dto';
import { TaskService } from '../assignment/task.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
    @InjectModel(User) private readonly userRepository: typeof User,

    private readonly rolesService: RolesService,
  ) {}
  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getByValue('USER');
      // роли нет то создает ее и присваивает ее юзеру
      if (!role) {
        await this.rolesService.create({
          value: 'USER',
          description: 'user',
        });
        // но при создании также создается роль админа для самого первого юзера
        const adminRole = await this.rolesService.create({
          value: 'ADMIN',
          description: 'admin',
        });
        await user.$set('roles', [adminRole.id]);
        user.roles = [adminRole];
        return user;
      }
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (e) {
      // throw new HttpException({});
    }
  }
  async getAll() {
    try {
      return await this.userRepository.findAll({
        include: { all: true },
      });
    } catch (e) {
      throw e;
    }
  }
  async findByIdAndPut(id: number, { tasks, roles, ...rest }: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByPk(id);
      if (user) {
        if (tasks && tasks.length) {
          const taskList = await this.taskService.findByIdArr(tasks);
          await user.$set('tasks', taskList);
        }
        if (roles && roles.length) {
          const roleList = await this.rolesService.findByIdArr(roles);
          await user.$set('roles', roleList);
        }
        await user.set(rest);
        await user.save();
        return await user.reload({ include: { all: true } });
      }
    } catch (e) {
      throw e;
    }
  }

  async findByIdAndPatch(id: number, { tasks, roles, ...rest }: UpdateUserDto) {
    try {
      const user = await this.userRepository.findByPk(id, {
        include: { all: true },
      });
      if (user) {
        if (tasks && tasks.length) {
          const taskList = await this.taskService.findByIdArr(tasks);
          const newTaskSet = new Set([...user.tasks, ...taskList]);
          await user.$set('tasks', [...newTaskSet]);
        }
        if (roles && roles.length) {
          const roleList = await this.rolesService.findByIdArr(roles);
          const newRolesSet = new Set([...user.roles, ...roleList]);
          await user.$set('roles', [...newRolesSet]);
        }
        await user.set(rest);
        await user.save();
        return await user.reload({ include: { all: true } });
      }
    } catch (e) {
      throw e;
    }
  }

  async findByIdArr(userIdArr?: number[]) {
    try {
      return await this.userRepository.findAll({
        where: {
          id: {
            [Op.in]: userIdArr ? userIdArr : [],
          },
        },
        attributes: ['id'],
      });
    } catch (e) {
      throw new HttpException('users not found', HttpStatus.NOT_FOUND);
    }
  }
  async getByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        include: { all: true },
      });
    } catch (e) {
      throw e;
    }
  }
  async addRole(dto: AddRoleDto) {
    try {
      const user = await this.userRepository.findByPk(dto.userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const role = await this.rolesService.getByValue(dto.value);
      if (user && role) {
        await user.$add('role', role.id);
        return dto;
      }
    } catch (e) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
  }
  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
