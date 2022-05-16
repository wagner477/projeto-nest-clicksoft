import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassRoomController } from './classroom.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ClassRoomController],
  providers: [ClassroomService, PrismaService],
})
export class ClassroomModule {}
