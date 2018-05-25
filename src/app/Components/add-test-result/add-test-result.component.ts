import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../Models/Student';
import * as Datastore from 'nedb';
import { Classdto } from '../../Models/Classdto';
import { Resultdto } from '../../Models/Resultdto';
import { Router } from "@angular/router";
import { Studentdto } from '../../Models/Studentdto';
import { DatabaseService } from '../../Services/Database/database.service'

@Component({
  selector: 'app-add-test-result',
  templateUrl: './add-test-result.component.html',
  styleUrls: ['./add-test-result.component.css'],
  providers: [DatabaseService]
})
export class AddTestResultComponent implements OnInit {
  students: Studentdto[] = [];
  resultForm: FormGroup;
  student: Student = new Student();
  studentDB: Datastore;

  constructor(private databaseService: DatabaseService, private router: Router){}

  ngOnInit() {
    this.studentDB = this.databaseService.LoadStudentDb();
    this.databaseService.dbRead({}, { Name: 1 }, this.studentDB)
      .then((docs) => this.updateStudentList(docs))
      .catch((err) => console.error(err));

      this.resultForm = new FormGroup({
        name: new FormControl(),
        result: new FormControl()
      });
  
      this.resultForm.setValue({
        name: '',
        result: ''
      });
  }

  updateStudentList(data:any):void {
    for (let i = 0; i < data.length; i++) {
      this.students.push(new Studentdto(data[i]));
    }
  }

  save() {
    var result = new Resultdto(this.resultForm.controls['name'].value, this.resultForm.controls['result'].value, this.students)
    var values: any = { StudentId: result.StudentId }
    var updateValues: any = { Results: result.NewTestScores };
    this.databaseService.dbUpdate(values, this.studentDB, updateValues)
    .then((docs) => this.router.navigate(['']))
    .catch((err) => console.error(err));
  }
}
