import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Names } from './Names';
import * as Datastore from 'nedb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  names: Names[] = [];
  title = 'app';

  constructor(private http: HttpClient){
  }
  ngOnInit(): void {
    this.someOtherFunc();
    // var db = new Datastore({ filename: '../../datastore/students.db', autoload: true });  
    // db.find({},function (err, docs) {
    //   this.doSomething(docs);
    // });
    // this.http.get<Names>('data.json').subscribe(resp => {
    //   this.data = (resp['Names']);
    //   for (let i = 0; i < this.data.length; i++) {
    //     this.names.push(new Names(this.data[i]));
    //   };
    // });
  }

  getData() {
    var db = new Datastore({ filename: '../../datastore/students.db', autoload: true });
    return new Promise((resolve, reject) => {
        db.find({}, function(err, docs) {
            if(err) reject(err);
            resolve(docs);
        });
    })
  }

  someOtherFunc() {
    this.getData()
    .then((docs) => this.doSomething(docs)) // here you will get it
    .catch((err) => console.error(err));
  }


  doSomething(data:any):void{
    for (let i = 0; i < data.length; i++) {
        this.names.push(new Names(data[i]));
      }
  }
}
