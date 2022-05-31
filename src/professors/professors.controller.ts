import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import { createProfessorCourseDto } from './dto/create-professor-course.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professor> {
    return this.professorsService.create(createProfessorDto);
  }

  @Get()
  async findAll(): Promise<Professor[]> {
    return this.professorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Professor> {
    return this.professorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfessorDto: createProfessorCourseDto) {
    return this.professorsService.update(+id, updateProfessorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Professor[]> {
    return this.professorsService.remove(+id);
  }

}
