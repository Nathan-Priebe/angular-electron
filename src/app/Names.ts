export class Names {
    name:string;
    id: number;

    constructor(obj: object) {
        this.name = obj['name'];
        this.id = obj['id'];
    }
}