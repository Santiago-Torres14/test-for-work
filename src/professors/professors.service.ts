import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { Student } from 'src/students/entities/student.entity';
import { Repository, UpdateResult } from 'typeorm';
import { createProfessorCourseDto } from './dto/create-professor-course.dto';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
  ) {}

  async create(professorDto: CreateProfessorDto): Promise<Professor> {
    return await this.professorRepository.save(professorDto);
  }

  async findAll(): Promise<Professor[]> {
    return await this.professorRepository.find();
  }

  async findOne(id: number): Promise<Professor> {
    return await this.professorRepository.findOne(id);
  }

  async update(
    id: number,
    updateProfessorDto: createProfessorCourseDto,
  ): Promise<Professor> {
    const {name, area, course} = updateProfessorDto;
    const professorEntity: Professor = await this.professorRepository.findOne(id);
    const courseEntity: Course = await this.coursesService.findOne(course);
    console.log(courseEntity)

    if(professorEntity ?? false){
      if(name ?? false){
        professorEntity.name = name;
      }
      if(area ?? false){
        professorEntity.area = area;
      }
      if(courseEntity ?? false){
        await this.professorRepository
        .createQueryBuilder()
        .relation(Course, "professors")
        .of(courseEntity)
        .add(professorEntity);
      }

      return await this.professorRepository.save(professorEntity);
    }
    
  }

  async remove(id: number): Promise<Professor[]> {
    const professor: Professor = await this.professorRepository.findOne(id);
    return await this.professorRepository.remove([professor]);
  }
}
