import { Injectable } from '@nestjs/common';
import { TeacherService } from '../modules/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(private teacherService: TeacherService) {}

  async validateTeacher(email: string, password: string): Promise<any> {
    const teacher = await this.teacherService.findOne(email);
    if (teacher && teacher.password === password) {
      const { password, ...result } = teacher;
      return result;
    }
    return null;
  }
}
