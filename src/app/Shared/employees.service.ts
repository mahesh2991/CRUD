import { Injectable } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {DatePipe} from "@angular/common";





@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employeeList: AngularFireList<any>;

  constructor(  public firebase:AngularFireDatabase,public datepipe:DatePipe) { }
  Form:FormGroup=new FormGroup({
    $key:new FormControl(null),
    fullName:new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    mobile: new FormControl('',[Validators.required,Validators.minLength(10)]),
    city: new FormControl(''),
    gender:new FormControl('1'),
    department:new FormControl(0),
    hireDate: new FormControl(new Date()),
    isParamanent:new FormControl(false)
  })
  initializedFormGroup(){
    this.Form.setValue({
      $key: null,
      fullName: '',
      email:'',
      mobile: '',
      city: '',
      gender: '1',
      department:0,
      hireDate: new Date(),
      isParamanent: false
    })
  }
  getEmployee(){
    // this.employeeList = this.firebase.list('employees');
    // return this.employeeList.snapshotChanges();
    this.employeeList=this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }
  insertEmployee(emp:any){
    this.employeeList.push({
        fullName:emp.fullName,
        email:emp.email,
      mobile:emp.mobile,
      city:emp.city,
      gender:emp.gender,
      department:emp.department,
      hireDate:emp.hireDate==""?"":this.datepipe.transform(emp.hireDate,'dd-mm-yy'),
      isParmanent:emp.isParmanent

      }
    )
  }
  updateEmployee(emp:any){
    this.employeeList.update(emp.$key, {
      fullName: emp.fullName,
      email: emp.email,
      mobile: emp.mobile,
      city: emp.city,
      gender: emp.gender,
      department: emp.department,
      hireDate: emp.hireDate == "" ? "" : this.datepipe.transform(emp.hireDate, 'mm-dd-yy'),
      isParmanent: emp.isParmanent
     })
  }
  deleteEmployee($key:string){
    this.employeeList.remove($key)
  }
}
