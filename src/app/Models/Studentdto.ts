export class Studentdto {
    _id: number;
    Name: string;
    StartDate: string; 
    EndDate: string;
    // TestScores: string[];

    constructor(obj: object) {
        
        this._id = obj['_id'];
        this.Name = obj['Name'];
        this.StartDate = obj['StartDate'];
        this.EndDate = obj['EndDate'];
        // this.TestScores = obj['TestScores'];
    }
}