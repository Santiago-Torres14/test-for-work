import { Course } from "src/courses/entities/course.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'student'})
export class Student{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 255})
    name: string;

    @ManyToOne(() => Course, (course) => course.students, {eager: true})
    @JoinColumn({name: "course_id"})
    course: Course;
}
