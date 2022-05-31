import { PartialType } from "@nestjs/mapped-types";
import { CreateProfessorDto } from "./create-professor.dto";

export class createProfessorCourseDto extends PartialType(CreateProfessorDto) {
    readonly course?: number;
}