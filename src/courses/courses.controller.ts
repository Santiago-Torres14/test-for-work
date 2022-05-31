import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  @Get('getAll')
  async getCoursesWProfessors(): Promise<Course[]> {
    return await this.coursesService.getCoursesWProfessors();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Course[]> {
    return this.coursesService.remove(+id);
  }
}
