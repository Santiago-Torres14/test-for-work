import { PartialType } from '@nestjs/mapped-types';
import { Student } from 'src/students/entities/student.entity';
import { CreateCourseDto } from './create-course.dto';

export class CreateCourseProfessorDto extends PartialType(CreateCourseDto) {
    readonly professor_id: number;
}