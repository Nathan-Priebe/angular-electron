import { Injectable } from '@angular/core';
import * as Datastore from 'nedb';

@Injectable()
export class DatabaseService {


  
  constructor() { }

  LoadStudentDb(): any {
    // db.insert([{ _id: 1, Name:"Fred Borrows", StartDate:"21/04/2018", EndDate:"21/07/2018" }, { _id: 2, Name:"John Smith", StartDate:"14/01/2018", EndDate:"28/04/2018" }, {_id:3, Name:"Kerry Anne", StartDate:"22/02/2018", EndDate:"22/05/2018"}]);
    return new Datastore({ filename: '../../Datastore/Students.db', autoload: true });
  }

  LoadClassDb(): any {
    // this.classDB.insert([{ _id: 1, Name:"Intermediate Morning 1"}, { _id: 2, Name:"Intermediate Morning 2"}, { _id:3, Name:"Afternoon Pre-Intermediate"}]);
    return new Datastore({ filename: '../../Datastore/Class.db', autoload: true});
  }

  dbRead(value: any, sort:any, dataStore: Datastore) {
      return new Promise((resolve, reject) => {
      dataStore.find(value).sort(sort).exec(function(err, docs) {
        if(err) reject(err);
        resolve(docs);
      });
    })
  };

  dbInsert(value: any, dataStore: Datastore) {
    return new Promise((resolve, reject) => {
      dataStore.insert(value, function(err, docs) {
        if(err) reject(err);
        resolve(docs);
      });
    });
  }

  dbDelete(value: any, dataStore: Datastore) {
    return new Promise((resolve, reject) => {
      dataStore.remove(value, function(err, numRemoved) {
        if(err) reject(err);
        resolve(numRemoved);
      });
    });
  }

  dbUpdate(value: any, dataStore: Datastore, updateValues: any) {
    return new Promise((resolve, reject) => {
      dataStore.update(value, { $set: updateValues }, { multi: true }, function (err, numReplaced) {
        if(err) reject(err);
        resolve(numReplaced);
      });
    });
  }
}
