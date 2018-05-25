import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Studentdto } from '../../Models/Studentdto';
import * as Datastore from 'nedb';
import { Student } from '../../Models/Student';
import { Router } from "@angular/router";
import { DatabaseService } from "../../Services/Database/database.service"

@Component({
  selector: 'app-root',
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
  providers: [DatabaseService]
})
export class Students implements OnInit {
  students: Studentdto[] = [];
  title = 'app';
  db: Datastore;
  message:string = "Students finishing course soon: ";
  messageVisible: Boolean = false;

  constructor(private databaseService: DatabaseService, private router: Router){}

  ngOnInit(): void {
    
    this.db = this.databaseService.LoadStudentDb();
    this.databaseService.dbRead({}, { Name: 1 }, this.db)
      .then((docs) => this.fillUIList(docs))
      .catch((err) => console.error(err));
  }

  updateFilter(filter: any)
  {
    this.students = [];
    this.databaseService.dbRead({}, filter, this.db)
    .then((docs) => this.fillUIList(docs))
    .catch((err) => console.error(err));
  }

  deleteStudent(Id:any)
  {
    if(window.confirm('Are sure you want to delete this item ?')){
        this.databaseService.dbDelete({StudentId: Id}, this.db)
        .then((docs) => window.location.reload())
        .catch((err) => console.error(err));
     }
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
