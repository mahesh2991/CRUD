import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
// import {AngularFireModule} from '@angular/fire';
// import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { EmployeeComponent } from './main/employee/employee.component';
import {MaterialModule} from './material/material.module';
import {EmployeeService} from './shared/employee.service';
import { DatePipe } from '@angular/common';
import {DepartmentService} from './shared/department.service';
import {NotificationService} from './shared/notification.service';
import { EmployeeListComponent } from './main/employee-list/employee-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import {DialogService} from './shared/dialog.service';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [EmployeeService, DatePipe,DepartmentService,NotificationService,DialogService],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent,MatConfirmDialogComponent]
})
export class AppModule { }
