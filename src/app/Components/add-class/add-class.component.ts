import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  classForm: FormGroup;
  student: Class = new Class();
  classDB: Datastore;

  constructor(private router: Router) { }

  ngOnInit() {
    this.classForm = new FormGroup({
      _id: new FormControl(),
      name: new FormControl(),
    });
  }

  save() {
    this.classDB = new Datastore({ filename: '../../Datastore/Class.db', autoload: true});
    var classObject: any = { _id: this.classForm.controls['_id'].value, Name: this.classForm.controls['name'].value};
    this.dataAccess("insert", classObject, {}, this.classDB)
    .then((docs) => this.router.navigate(['/Classes']))
    .catch((err) => {
      alert('Unable to insert data, ensure ID is unique');
      console.error(err)
    });
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

}
