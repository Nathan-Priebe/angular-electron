export class Classdto{
    _id: number;
    Name: string;

    constructor(obj: object) {
        this._id = obj['_id'];
        this.Name = obj['Name'];
    }
}