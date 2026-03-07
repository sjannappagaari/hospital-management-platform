// backend/src/modules/doctors/doctors.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/create-doctor.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Doctors')
@Controller('api/doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ) {
    return this.doctorsService.findAll(skip, take);
  }

  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Get doctors by department' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async findByDepartment(
    @Param('departmentId') departmentId: string,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ) {
    return this.doctorsService.findByDepartment(departmentId, skip, take);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  async findById(@Param('id') id: string) {
    return this.doctorsService.findById(id);
  }

  @Get(':id/slots')
  @ApiOperation({ summary: 'Get available slots for a doctor' })
  @ApiQuery({ name: 'date', required: true, type: String })
  async getAvailableSlots(
    @Param('id') id: string,
    @Query('date') date: string,
  ) {
    return this.doctorsService.getAvailableSlots(id, date);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new doctor (Admin only)' })
  async create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update doctor (Admin only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete doctor (Admin only)' })
  async delete(@Param('id') id: string) {
    return this.doctorsService.delete(id);
  }
}
