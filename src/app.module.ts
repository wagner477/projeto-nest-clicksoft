import { Module } from '@nestjs/common';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { ClassroomModule } from './modules/classroom/classroom.module';

@Module({
  imports: [TeacherModule, AuthModule, StudentModule, ClassroomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
