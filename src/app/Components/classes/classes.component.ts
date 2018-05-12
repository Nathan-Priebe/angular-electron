import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  classDB: Datastore;

  constructor(private router: Router) { }

  ngOnInit() {
    this.classDB = new Datastore({ filename: '../../Datastore/Class.db', autoload: true});
    // this.classDB.insert([{ _id: 1, Name:"Intermediate Morning 1"}, { _id: 2, Name:"Intermediate Morning 2"}, { _id:3, Name:"Afternoon Pre-Intermediate"}]);
    this.dataAccess("read", {}, { Name: 1 }, this.classDB)
      .then((docs) => this.fillUIList(docs))
      .catch((err) => console.error(err));
  }

  fillUIList(data:any):void{
    for (let i = 0; i < data.length; i++) {
        this.classes.push(new Classdto(data[i]));
    }
  }

  deleteClass(Id:any)
  {
    if(window.confirm('Are sure you want to delete this item ?')){
        this.dataAccess("delete", {_id: Id}, {}, this.classDB)
        .then((docs) => window.location.reload())
        .catch((err) => console.error(err));
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

}
