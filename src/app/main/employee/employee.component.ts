import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {DepartmentService} from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  constructor(public empService: EmployeeService,
    public deptService: DepartmentService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>) { }

  ngOnInit() {
    this.empService.getEmployees();
  }

  onClick(){
    this.empService.form.reset();
    this.empService.initializeFormGroup();
    //this.notificationService.success('Submitted Successfully');
  }

  onSubmit(){
    if(this.empService.form.valid){


      // @ts-ignore
      if(!this.empService.form.get('$key').value)
        this.empService.insertEmployee(this.empService.form.value);
      else
        this.empService.updateEmployee(this.empService.form.value)
      this.empService.form.reset();
      this.empService.initializeFormGroup();
      this.notificationService.success("Submitted Successfully");
      this.onClose();
    }
  }

  onClose(){
    this.empService.form.reset();
    this.empService.initializeFormGroup();
    this.dialogRef.close();
  }

}
