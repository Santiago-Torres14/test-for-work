import { PartialType } from '@nestjs/mapped-types';
import { Area } from '../entities/professor.entity';
import { CreateProfessorDto } from './create-professor.dto';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {}
