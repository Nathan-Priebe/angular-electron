export class Studentdto {
    StudentId: number;
    Name: string;
    Class: string;
    StartDate: string; 
    EndDate: string;
    // TestScores: string[];

    constructor(obj: object) {
        this.StudentId = obj['StudentId'];
        this.Name = obj['Name'];
        this.Class = obj['Class'];
        this.StartDate = obj['StartDate'];
        this.EndDate = obj['EndDate'];
        // this.TestScores = obj['TestScores'];
    }
}