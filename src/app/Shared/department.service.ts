import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList }from "@angular/fire/compat/database";
// @ts-ignore
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
departmentList: AngularFireList<any>;
array:any[] = [];
  constructor(public firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('Departments');
    this.departmentList.snapshotChanges()
    .subscribe(list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      })
    })
   }



   getDepartmentName($key:any){
     if($key == "0"){
       return "";
     }
     else{
       return _.find(this.array, (obj:any) => {
         return obj.$key == $key;
       })['name']
     }
   }
}
