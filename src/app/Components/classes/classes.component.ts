import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Datastore from 'nedb';
import { Class } from '../../Models/Class';
import { Classdto } from '../../Models/Classdto';
import { Router } from "@angular/router";
import { DatabaseService } from "../../Services/Database/database.service"

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  providers: [DatabaseService]
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  classDB: Datastore;

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.classDB = this.databaseService.LoadClassDb();
    this.databaseService.dbRead({}, { Name: 1 }, this.classDB)
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
        this.databaseService.dbDelete({_id: Id}, this.classDB)
        .then((docs) => window.location.reload())
        .catch((err) => console.error(err));
     }
  }
}
