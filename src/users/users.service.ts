import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from '../roles/roles.service';

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
      if (!role) {
        const role = await this.rolesService.create({
          value: 'USER',
          description: 'user',
        });
        await user.$set('roles', [role.id]);
        return user;
      }

      await user.$set('roles', [role.id]);
      return user;
    } catch (e) {
      // throw new HttpException({});
    }
  }
  async getAll() {
    try {
      const user = await this.userRepository.findAll({
        include: { all: true },
      });
    } catch (e) {
      // throw new HttpException({});
    }
  }
}
