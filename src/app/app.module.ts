import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Students } from '../app/Components/students/students';
import { MasterComponent } from '../app/Components/master/master.component';
import { AddStudentComponent } from '../app/Components/add-student/add-student.component';
import { ClassesComponent } from '../app/Components/classes/classes.component';
import { AddClassComponent } from '../app/Components/add-class/add-class.component';


@NgModule({
  declarations: [
    MasterComponent,
    Students,
    AddStudentComponent,
    ClassesComponent,
    AddClassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'AddStudent', component: AddStudentComponent },
      { path: 'StudentDetails', component: Students },
      { path: 'Classes', component: ClassesComponent },
      { path: 'AddClass', component: AddClassComponent},
      { path: '', component: Students }
    ])
  ],
  providers: [],
  bootstrap: [MasterComponent]
})
export class AppModule { }
