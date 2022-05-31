import { forwardRef, Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { Professor } from './entities/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Professor]),
  forwardRef(() => CoursesModule)],
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
  exports: [ProfessorsService]
})
export class ProfessorsModule {}
