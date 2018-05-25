import { Studentdto } from './Studentdto';

export class Resultdto{
    _id: number;
    StudentId: number;
    StudentName: string;
    Score:number;
    NewTestScores: number[];

    constructor(id:any, result:any, students: Studentdto[]) {
        this.StudentId = id;
        this.NewTestScores = [];
        students.forEach(element => {
            if(element.StudentId == this.StudentId)
            {
                element.Results.push(result);
                this.NewTestScores = element.Results.slice();
            }
          });
    }
}