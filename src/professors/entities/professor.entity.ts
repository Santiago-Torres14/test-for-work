import { Course } from "src/courses/entities/course.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToMany } from "typeorm";

export enum Area{
    SCIENCE = "science",
    MATH = "math",
    ENGLISH = "english"
}

@Entity()
export class Professor{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 255})
    name: string;

    @Column({
        type: "enum",
        enum: Area
    })
    area: Area;

    @ManyToMany(() => Course, (course) => course.professors)
    courses: Course[];
}
