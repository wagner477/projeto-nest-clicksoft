import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassroomService) {}

  @Post()
  async create(@Body() data: Prisma.ClassroomCreateInput) {
    return this.classRoomService.create(data);
  }

  @Get()
  async findAll() {
    return this.classRoomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.classRoomService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ClassroomCreateInput,
  ) {
    return this.classRoomService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classRoomService.delete(id);
  }
}
