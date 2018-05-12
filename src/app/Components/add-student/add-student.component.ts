import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../Models/Student';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  classes: Class[] = [];
  studentForm: FormGroup;
  student: Student = new Student();
  db: Datastore;
  classDB: Datastore;

  constructor(private router: Router){}

  ngOnInit():void{
    this.classDB = new Datastore({ filename: '../../Datastore/Class.db', autoload: true});
    // this.classDB.insert([{ _id: 1, Name:"Intermediate Morning 1"}, { _id: 2, Name:"Intermediate Morning 2"}, { _id:3, Name:"Afternoon Pre-Intermediate"}]);
    this.dataAccess("read", {}, { Name: 1 }, this.classDB)
      .then((docs) => this.updateClassList(docs))
      .catch((err) => console.error(err));

    this.studentForm = new FormGroup({
      studentId: new FormControl(),
      name: new FormControl(),
      class: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    this.studentForm.setValue({
      studentId: '',
      name: '',
      class: '',
      startDate: new Date().toISOString().substring(0,10),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().substring(0,10)
    });
  }

  updateClassList(data:any):void {
    for (let i = 0; i < data.length; i++) {
      this.classes.push(new Classdto(data[i]));
    }
  }

  dataAccess(command:string, filter: any, sort:any, dataStore: Datastore) {
    return new Promise((resolve, reject) => {
      if(command === "read")
      {
        dataStore.find(filter).sort(sort).exec(function(err, docs) {
          if(err) reject(err);
          resolve(docs);
        });
      }
      else if(command === "insert")
      {
        dataStore.insert(filter, function(err, docs) {
          if(err) reject(err);
          resolve(docs);
        });
      }
      else if(command === "delete")      
      {
        dataStore.remove(filter, function(err, numRemoved) {
          if(err) reject(err);
          resolve(numRemoved);
        });
      }
    });
  }

  save() {
    this.db = new Datastore({ filename: '../../Datastore/Students.db', autoload: true });
    var student: any = { StudentId: this.studentForm.controls['studentId'].value, Name: this.studentForm.controls['name'].value, Class: this.studentForm.controls['class'].value, StartDate: this.studentForm.controls['startDate'].value, EndDate:this.studentForm.controls['endDate'].value };
    this.dataAccess("insert", student, {}, this.db)
    .then((docs) => this.router.navigate(['']))
    .catch((err) => console.error(err));
  }

  changeStartDate() {
    var startDate = new Date(this.studentForm.controls['startDate'].value);
    this.studentForm.patchValue({
      endDate: new Date(startDate.setMonth(startDate.getMonth() + 3)).toISOString().substring(0,10)
    });
  }
}
