import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../Models/Student';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";
import { DatabaseService } from '../../Services/Database/database.service'

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [DatabaseService]
})
export class AddStudentComponent implements OnInit {
  classes: Class[] = [];
  studentForm: FormGroup;
  student: Student = new Student();
  db: Datastore;
  classDB: Datastore;

  constructor(private databaseService: DatabaseService, private router: Router){}

  ngOnInit():void{
    this.classDB = this.databaseService.LoadClassDb();
    this.databaseService.dbRead({}, { Name: 1 }, this.classDB)
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

  save() {
    this.db = this.databaseService.LoadStudentDb();
    var student: any = { StudentId: this.studentForm.controls['studentId'].value, Name: this.studentForm.controls['name'].value, Class: this.studentForm.controls['class'].value, StartDate: this.studentForm.controls['startDate'].value, EndDate:this.studentForm.controls['endDate'].value, Results: [] };
    this.databaseService.dbInsert(student, this.db)
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
