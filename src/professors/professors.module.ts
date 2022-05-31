import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { Professor } from './entities/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
  imports: [TypeOrmModule.forFeature([Professor])]
})
export class ProfessorsModule {}
