import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  openConfirmDialog(msg:any){
    return this.dialog.open(MatConfirmDialogComponent,{
      position: {top: "10px"},
      width: '400px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message : msg
      }
    })
  }


}
