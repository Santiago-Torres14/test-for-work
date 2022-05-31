import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorsService {
  constructor(@InjectRepository(Professor) private readonly professorRepository: Repository<Professor>){}

  async create(professorDto: CreateProfessorDto): Promise<Professor> {
    console.log("Professor created")
    return await this.professorRepository.save(professorDto);
  }

  async findAll() : Promise<Professor[]>{
    return await this.professorRepository.find();
  }

  async findOne(id: number): Promise<Professor>{
    return await this.professorRepository.findOne(id);
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<UpdateResult> {
    return this.professorRepository.update(id, updateProfessorDto);
  }

  async remove(id: number): Promise<Professor[]>{
    const professor: Professor = await this.professorRepository.findOne(id);
    return await this.professorRepository.remove([professor]);
  }
}
