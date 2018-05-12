import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studentdto } from '../../Models/Studentdto';
import * as Datastore from 'nedb';
import { Student } from '../../Models/Student';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit {
  students: Studentdto[] = [];
  title = 'app';
  db: Datastore;
  message:string = "Students finishing course soon: ";
  messageVisible: Boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    // db.insert([{ _id: 1, Name:"Fred Borrows", StartDate:"21/04/2018", EndDate:"21/07/2018" }, { _id: 2, Name:"John Smith", StartDate:"14/01/2018", EndDate:"28/04/2018" }, {_id:3, Name:"Kerry Anne", StartDate:"22/02/2018", EndDate:"22/05/2018"}]);
    this.db = new Datastore({ filename: '../../Datastore/Students.db', autoload: true });
    this.dataAccess("read", {}, { Name: 1 })
      .then((docs) => this.fillUIList(docs))
      .catch((err) => console.error(err));
  }

  updateFilter(filter: any)
  {
    this.students = [];
    console.log(filter);
    this.dataAccess("read", {}, filter)
    .then((docs) => this.fillUIList(docs))
    .catch((err) => console.error(err));
  }

  deleteStudent(Id:any)
  {
    if(window.confirm('Are sure you want to delete this item ?')){
        this.dataAccess("delete", {StudentId: Id}, {})
        .then((docs) => window.location.reload())
        .catch((err) => console.error(err));
     }
  }

  dataAccess(command:string, filter: any, sort:any) {
    return new Promise((resolve, reject) => {
      if(command === "read")
      {
        this.db.find(filter).sort(sort).exec(function(err, docs) {
          if(err) reject(err);
          resolve(docs);
        });
      }
      else if(command === "delete")      
      {
        this.db.remove(filter, function(err, numRemoved) {
          if(err) reject(err);
          resolve(numRemoved);
        });
      }
    });
  }
  
  fillUIList(data:any):void{
    for (let i = 0; i < data.length; i++) {
        this.students.push(new Studentdto(data[i]));
        if(data[i]['EndDate'] <= new Date().toISOString().substring(0,10))
        {
          this.messageVisible = true;
          this.message = this.message + data[i]['Name'] + "(" + data[i]['StudentId'] +")";
        }
        
    }
  }
}
