import { ConsoleLogger, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private readonly StudentRepository: Repository<Student>,@Inject(forwardRef(() => CoursesService)) private readonly coursesService: CoursesService){}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const {name, course_id} = createStudentDto;
    const course: Course = await this.coursesService.findOne(course_id);
    if((course ?? false)){
      const studentEntity: Student = this.StudentRepository.create();
      studentEntity.name = name;
      studentEntity.course = course;
      return await this.StudentRepository.save(studentEntity);
    }
  }

  async findAll(): Promise<Student[]> {
    return await this.StudentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    return await this.StudentRepository.findOne(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const {name, course_id} = updateStudentDto;
    const studentEntity: Student = await this.StudentRepository.findOne(id);
    if (studentEntity ?? false){
      const courseEntity: Course = await this.coursesService.findOne(course_id);
      if(name ?? false){
        studentEntity.name = name;
      }
      if(courseEntity ?? false){
        studentEntity.course = courseEntity;
      }
      return await this.StudentRepository.save(studentEntity);
    }
  }

  async remove(id: number): Promise<Student[]> {
    const student: Student = await this.StudentRepository.findOne(id);
    return await this.StudentRepository.remove([student]);
  }
}
