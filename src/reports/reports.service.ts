import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './report.model';
import { CreateReportDto } from './dto/create.report.dto';
import { UsersService } from '../users/users.service';
import { Task } from '../assignment/task.model';
import { CreateTaskDto } from '../assignment/dto/create.task.dto';
import { Op } from 'sequelize';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @InjectModel(Report) private readonly reportRepository: typeof Report,
  ) {}
  async getAll() {
    try {
      const reports = await this.reportRepository.findAll({
        include: { all: true },
      });
      return reports;
    } catch (e) {
      throw new HttpException('отчеты не найдены', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number) {
    try {
      const report = await this.reportRepository.findByPk(id, {
        include: { all: true },
      });
      if (!report) {
        throw new NotFoundException({ message: 'ты еблан' });
      }
      return report;
    } catch (e) {
      throw new NotFoundException({ message: e.message });
    }
  }

  async create(id: number, { userList, ...rest }: CreateReportDto) {
    try {
      const users = await this.userService.findByIdArr(userList);
      const report = await this.reportRepository.create({
        ...rest,
        authorId: id,
      });
      await report.$set('userList', users);
      return report.reload({ include: { all: true } });
    } catch (e) {
      throw new HttpException('репорт поломан', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: number, { userList, ...rest }: CreateReportDto) {
    try {
      const report = await this.reportRepository.findByPk(id, {
        include: { all: true },
      });
      if (userList) {
        const users = await this.userService.findByIdArr(userList);
        await report.$set('userList', users);
      }
      await report.set(rest);
      await report.save();
      return await report.reload({ include: { all: true } });
    } catch (e) {}
  }

  async findByIdArr(reportIdArr?: number[]) {
    try {
      return await this.reportRepository.findAll({
        where: {
          id: {
            [Op.in]: reportIdArr ? reportIdArr : [],
          },
        },
        attributes: ['id'],
      });
    } catch (e) {
      throw new HttpException('report not found', HttpStatus.NOT_FOUND);
    }
  }
}
