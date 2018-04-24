import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Names } from './Names';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  names: Names[] = [];
  data: Object[] = [];
  title = 'app';

  constructor(private http: HttpClient){
  }
  ngOnInit(): void {
    this.http.get<Names>('data.json').subscribe(resp => {
      this.data = (resp['Names']);
      for (let i = 0; i < this.data.length; i++) {
        this.names.push(new Names(this.data[i]));
      };
    });
  }
}
