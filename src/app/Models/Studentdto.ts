export class Studentdto {
    StudentId: number;
    Name: string;
    Class: string;
    StartDate: string; 
    EndDate: string;
    Results: number[];
    AverageResult: number;

    constructor(obj: object) {
        var sum:number = 0;

        this.StudentId = obj['StudentId'];
        this.Name = obj['Name'];
        this.Class = obj['Class'];
        this.StartDate = obj['StartDate'];
        this.EndDate = obj['EndDate'];
        this.Results = obj['Results'].slice(0, 3);
        if(this.Results.length > 0) {
            this.Results.forEach(element => {
                sum = Number(sum) + Number(element);
            });
            this.AverageResult = sum/this.Results.length;
        }
        else {
            this.AverageResult = 0;
        }
        
    }
}