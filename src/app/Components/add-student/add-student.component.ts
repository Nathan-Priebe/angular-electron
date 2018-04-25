import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../../Models/Student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  student: Student = new Student();
  

  constructor() { }

  ngOnInit():void{
    this.studentForm = new FormGroup({
      studentId: new FormControl(),
      name: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  save(){
    alert("Save Form");
    console.log("Save Form");
  }


}
