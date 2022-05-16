import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ClassroomService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ClassroomCreateInput) {
    const classRoomNumber = await this.prisma.classroom.findFirst({
      where: {
        room_number: data.room_number,
      },
    });

    if (classRoomNumber) {
      throw new Error('Class room number already exists.');
    }

    const classRoom = await this.prisma.classroom.create({
      data,
    });

    return classRoom;
  }

  async findAll() {
    return await this.prisma.classroom.findMany();
  }

  async findOne(id: string) {
    const classRoom = await this.prisma.classroom.findUnique({
      where: {
        id,
      },
      include: {
        created_by: true,
        Student: true,
      },
    });

    if (!classRoom) {
      throw new Error('Class room not exists');
    }

    return classRoom;
  }

  async update(id: string, data: Prisma.ClassroomCreateInput) {
    const classRoomExists = await this.prisma.classroom.findUnique({
      where: {
        id: id,
      },
    });

    if (!classRoomExists) {
      throw new Error('Class room not exists');
    }

    return await this.prisma.classroom.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const classRoomExists = await this.prisma.classroom.findUnique({
      where: {
        id: id,
      },
    });

    if (!classRoomExists) {
      throw new Error('Class room not exists');
    }

    return this.prisma.classroom.delete({
      where: {
        id,
      },
    });
  }
}
