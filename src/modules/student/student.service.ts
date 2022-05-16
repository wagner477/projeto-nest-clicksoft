import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StudentCreateInput) {
    const registarionExists = await this.prisma.student.findFirst({
      where: {
        registration: data.registration,
      },
    });

    if (registarionExists) {
      throw new Error('Registration already exists.');
    }

    const emailExists = await this.prisma.student.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new Error('Email already exists.');
    }

    const student = await this.prisma.student.create({
      data,
    });

    return student;
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      throw new Error('Student not exists');
    }

    return student;
  }

  async update(id: string, data: Prisma.StudentCreateInput) {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    if (!studentExists) {
      throw new Error('Student not exists');
    }

    return await this.prisma.student.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const studentExists = await this.prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    if (!studentExists) {
      throw new Error('Student not exists');
    }

    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
