import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { Student } from './students/entities/student.entity';
import { Course } from './courses/entities/course.entity';
import { Professor } from './professors/entities/professor.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
      migrationsTableName: 'migration',
      migrations: ['dist/src/db/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/db/migration',
      },
    }), 
    StudentsModule, 
    CoursesModule, 
    ProfessorsModule,
    TypeOrmModule.forFeature([
    Student, Course, Professor])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
