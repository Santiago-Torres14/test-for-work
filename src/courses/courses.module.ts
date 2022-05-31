import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { StudentsModule } from 'src/students/students.module';
import { Course } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsModule } from 'src/professors/professors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), forwardRef(() => StudentsModule),
  forwardRef(() => ProfessorsModule)],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
