import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','email','mobile','city','departmentName','actions'];
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;


  constructor(public empService: EmployeeService, public deptService: DepartmentService, public dialog: MatDialog,
    public notificationService: NotificationService,
    public dialogService: DialogService) { }

  ngOnInit(){
    this.empService.getEmployees()
    .subscribe(list => {
      let array = list.map(
        item => {
          let departmentName = this.deptService.getDepartmentName(item.payload.val()['department']);
          return {
            $key : item.key,
            departmentName,
            ...item.payload.val()
          }
        }
      )
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate=(data,filter) => {
        return this.displayedColumns.some(
          ele => {
            return ele != 'actions' && data[ele].toLowerCase().
            indexOf(filter) != -1;
          }
        )
      }

    });
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase()
  }

  onCreate(){
    this.empService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }
  onEdit(row:any){
    this.empService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete($key:any){
   // if(confirm('Are you sure to delete this record?')){
   //   this.empService.deleteEmployee($key)
   //   this.notificationService.warn('Record Has been Deleted')

  //  }

    this.dialogService.openConfirmDialog("Are you Sure to delete?")
    .afterClosed().subscribe(
      res => {
        if(res) {
          this.empService.deleteEmployee($key);
          this.notificationService.warn("Record Deleted!")
        }
      }
    )

  }

}
