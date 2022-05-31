import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Professor } from 'src/professors/entities/professor.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToMany(() => Professor, (professor) => professor.courses, { onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinTable({
    name: 'course_professor',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'professor_id',
      referencedColumnName: 'id',
    },
  })
  professors: Professor[];

  @OneToMany(() => Student, (student) => student.course, {
    onDelete: 'CASCADE',
    cascade: true
  })
  students: Student[];
}
