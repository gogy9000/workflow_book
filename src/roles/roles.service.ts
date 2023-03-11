import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}
  async create(dto: CreateRoleDto) {
    try {
      return await this.roleRepository.create(dto);
    } catch (e) {
      throw e;
    }
  }
  async getByValue(value: string) {
    try {
      return await this.roleRepository.findOne({ where: { value } });
    } catch (e) {
      throw e;
    }
  }
}
