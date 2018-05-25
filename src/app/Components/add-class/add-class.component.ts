import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";
import { DatabaseService } from '../../Services/Database/database.service'

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
  providers: [DatabaseService]
})
export class AddClassComponent implements OnInit {
  classForm: FormGroup;
  classDB: Datastore;

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.classForm = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
    });
  }

  save() {
    this.classDB = this.databaseService.LoadClassDb();
    var classObject: any = { _id: this.classForm.controls['_id'].value, Name: this.classForm.controls['name'].value};
    this.databaseService.dbInsert(classObject, this.classDB)
    .then((docs) => this.router.navigate(['/Classes']))
    .catch((err) => {
      alert('Unable to insert data, ensure ID is unique');
      console.error(err)
    });
  }
}
