// backend/src/modules/doctors/doctors.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/create-doctor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where: { isAvailable: true },
        skip,
        take,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              avatar: true,
            },
          },
          department: true,
          availability: true,
        },
        orderBy: { displayOrder: 'asc' },
      }),
      this.prisma.doctor.count({ where: { isAvailable: true } }),
    ]);

    return { data, total, skip, take };
  }

  async findById(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        department: true,
        availability: true,
        appointments: {
          where: { status: 'COMPLETED' },
          take: 5,
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return doctor;
  }

  async findByDepartment(departmentId: string, skip = 0, take = 10) {
    const [data, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where: {
          departmentId,
          isAvailable: true,
        },
        skip,
        take,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          department: true,
        },
        orderBy: { displayOrder: 'asc' },
      }),
      this.prisma.doctor.count({
        where: {
          departmentId,
          isAvailable: true,
        },
      }),
    ]);

    return { data, total, skip, take };
  }

  async create(dto: CreateDoctorDto) {
    const hashedPassword = await bcrypt.hash('Doctor@123', 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: 'DOCTOR',
      },
    });

    return this.prisma.doctor.create({
      data: {
        userId: user.id,
        departmentId: dto.departmentId,
        specialization: dto.specialization,
        qualifications: dto.qualifications,
        experience: dto.experience,
        bio: dto.bio,
        registrationNo: dto.registrationNo,
        consultationFee: dto.consultationFee,
      },
      include: {
        user: true,
        department: true,
      },
    });
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.prisma.doctor.update({
      where: { id },
      data: dto,
      include: {
        user: true,
        department: true,
      },
    });
  }

  async delete(id: string) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return this.prisma.doctor.update({
      where: { id },
      data: { isAvailable: false },
    });
  }

  async getAvailableSlots(doctorId: string, date: string) {
    // Get doctor availability for the day
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
    });

    const availability = await this.prisma.doctorAvailability.findFirst({
      where: {
        doctorId,
        dayOfWeek: dayOfWeek.toUpperCase(),
        isActive: true,
      },
    });

    if (!availability) {
      return [];
    }

    // Get booked appointments for the day
    const bookedAppointments = await this.prisma.appointment.findMany({
      where: {
        doctorId,
        appointmentDate: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
        status: { in: ['APPROVED', 'PENDING'] },
      },
    });

    // Generate available slots
    const slots = [];
    const [startHour, startMin] = availability.startTime.split(':');
    const [endHour, endMin] = availability.endTime.split(':');

    let currentHour = parseInt(startHour);
    let currentMin = parseInt(startMin);

    const endTotalMin = parseInt(endHour) * 60 + parseInt(endMin);

    while (currentHour * 60 + currentMin < endTotalMin) {
      const slotTime = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;

      const isBooked = bookedAppointments.some(
        (apt) => apt.appointmentTime === slotTime,
      );

      if (!isBooked) {
        slots.push(slotTime);
      }

      currentMin += availability.slotDuration;
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60);
        currentMin = currentMin % 60;
      }
    }

    return slots;
  }
}
