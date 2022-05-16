import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TeacherModule } from 'src/modules/teacher/teacher.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TeacherModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
