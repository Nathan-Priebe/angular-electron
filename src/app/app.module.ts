import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from '../app/Components/Students/app.component';
import { MasterComponent } from '../app/Components/master/master.component';
import { AddStudentComponent } from '../app/Components/add-student/add-student.component';


@NgModule({
  declarations: [
    MasterComponent,
    AppComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'AddStudent', component: AddStudentComponent },
      { path: 'StudentDetails', component: AppComponent },
      { path: '', component: AppComponent }
    ])
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class AppModule { }
