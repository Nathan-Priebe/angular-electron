import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studentdto } from '../../Models/Studentdto';
import * as Datastore from 'nedb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: Studentdto[] = [];
  title = 'app';

  constructor(private http: HttpClient){
  }
  ngOnInit(): void {
    // Init DB data
    // var db = new Datastore({ filename: '../../Datastore/students.db', autoload: true });
    // db.insert([{ _id: 1, Name:"Fred Borrows", StartDate:"21/04/2018", EndDate:"21/07/2018" }, { _id: 2, Name:"John Smith", StartDate:"14/01/2018", EndDate:"28/04/2018" }, {_id:3, Name:"Kerry Anne", StartDate:"22/02/2018", EndDate:"22/05/2018"}]);
    this.getStudentData();
  }

  getData() {
    var db = new Datastore({ filename: '../../Datastore/students.db', autoload: true });
    return new Promise((resolve, reject) => {
        db.find({}, function(err, docs) {
            if(err) reject(err);
            resolve(docs);
        });
    })
  }

  getStudentData() {
    this.getData()
    .then((docs) => this.fillUIList(docs)) // here you will get it
    .catch((err) => console.error(err));
  }


  fillUIList(data:any):void{
    for (let i = 0; i < data.length; i++) {
        this.students.push(new Studentdto(data[i]));
      }
  }
}
