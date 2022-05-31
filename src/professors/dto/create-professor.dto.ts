import { Area } from "../entities/professor.entity";

export class CreateProfessorDto {
    readonly name: string;
    readonly area: Area;
}
