import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/professors/entities/professor.entity';
import { ProfessorsService } from 'src/professors/professors.service';
import { Student } from 'src/students/entities/student.entity';
import { StudentsService } from 'src/students/students.service';
import { Repository } from 'typeorm';
import { CreateCourseProfessorDto } from './dto/create-course-professor.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
    @Inject(forwardRef(() => ProfessorsService))
    private professorService: ProfessorsService,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async getCoursesWProfessors(): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.professors', 'professors')
      .getMany();
  }

  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne(id);
  }

  async getCourseWProfessor(id: number): Promise<Course> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.professors', 'professor')
      .where('course.id = :id', { id: id })
      .getOne();
  }

  async update(
    id: number,
    updateCourseDto: CreateCourseProfessorDto,
  ): Promise<Course> {
    const { name, professor_id } = updateCourseDto;
    const courseEntity: Course = await this.courseRepository.findOne(id);
    const professorEntity: Professor = await this.professorService.findOne(
      professor_id,
    );
    if (courseEntity ?? false) {
      if (name ?? false) {
        courseEntity.name = name;
      }
      if (professorEntity ?? false) {
        await this.courseRepository
          .createQueryBuilder()
          .relation(Course, 'professors')
          .of(courseEntity)
          .add(professorEntity);
      }
      return await this.courseRepository.save(courseEntity);
    }
  }

  async remove(id: number): Promise<Course[]> {
    const courseEntity: Course = await this.getCourseWProfessor(id);
    const professorEntity: Professor[] = courseEntity.professors;
    const studentEntity: Student[] = courseEntity.students;

    if (professorEntity ?? false) {
      professorEntity.forEach(
        async (professor) =>
          await this.courseRepository
            .createQueryBuilder()
            .relation(Professor, 'courses')
            .of(professor)
            .remove(courseEntity)
      );
    }

    if (studentEntity ?? false) {
      studentEntity.forEach(
        async (student) =>
          await this.courseRepository
            .createQueryBuilder()
            .relation(Course, 'students')
            .of(courseEntity)
            .remove(student)
      );
    }

    return await this.courseRepository.remove([courseEntity]);
  }
}
