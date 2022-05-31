import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courseRepository: Repository<Course>, @Inject(forwardRef(() => StudentsService)) private studentService: StudentsService){}

  async create(createCourseDto: CreateCourseDto): Promise<Course>{

    return ;
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCoursesWProfessors(): Promise<Course[]> {
    return await this.courseRepository
    .createQueryBuilder("course")
    .leftJoinAndSelect("course.professors", "professor")
    .getMany();
  }

  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: number): Promise<Course[]>{
    const course: Course = await this.courseRepository.findOne(id);
    return ;
  }

}
