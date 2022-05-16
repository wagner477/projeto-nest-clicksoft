import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TeacherCreateInput) {
    const registarionExists = await this.prisma.teacher.findFirst({
      where: {
        registration: data.registration,
      },
    });

    if (registarionExists) {
      throw new Error('Registration already exists.');
    }

    const emailExists = await this.prisma.teacher.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new Error('Email already exists.');
    }

    const teacher = await this.prisma.teacher.create({
      data,
    });

    return teacher;
  }

  async findAll() {
    return await this.prisma.teacher.findMany();
  }

  async findOne(email: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (!teacher) {
      throw new Error('Teacher not exists');
    }

    return teacher;
  }

  async update(id: string, data: Prisma.TeacherCreateInput) {
    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacherExists) {
      throw new Error('Teacher not exists');
    }

    return await this.prisma.teacher.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const teacherExists = await this.prisma.teacher.findUnique({
      where: {
        id: id,
      },
    });

    if (!teacherExists) {
      throw new Error('Teacher not exists');
    }

    return this.prisma.teacher.delete({
      where: {
        id,
      },
    });
  }
}
