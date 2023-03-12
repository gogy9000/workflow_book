import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly rolesService: RolesService,
  ) {}
  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.rolesService.getByValue('USER');
      // роли нет то создает ее и присваивает ее юзеру
      if (!role) {
        const role = await this.rolesService.create({
          value: 'USER',
          description: 'user',
        });
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
      }
      //меняет на ходу поле в таблице
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
        //раскукоживает все ссылки в сущности
        include: { all: true },
      });
    } catch (e) {
      // throw new HttpException({});
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
