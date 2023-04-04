import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/role.auth.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Report } from './report.model';
import { CreateReportDto } from './dto/create.report.dto';
import { User } from '../users/decorators/user.decorator';

@ApiTags('reports')
@ApiBearerAuth('JWT-auth')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'показать все отчеты' })
  @ApiResponse({ status: 200, type: [Report] })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.reportsService.getAll();
  }

  @ApiOperation({ summary: 'Найти по id' })
  @ApiResponse({ status: 200, type: Report })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.reportsService.findById(id);
  }

  @ApiOperation({ summary: 'создать отчет' })
  @ApiResponse({ status: 200, type: Report })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Post()
  create(@User('id') id: number, @Body() dto: CreateReportDto) {
    return this.reportsService.create(id, dto);
  }

  @ApiOperation({ summary: 'обновить отчет' })
  @ApiResponse({ status: 200, type: Report })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: CreateReportDto) {
    return this.reportsService.update(id, dto);
  }
}
