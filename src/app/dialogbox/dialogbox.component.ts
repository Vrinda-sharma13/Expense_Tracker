import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExpenseService } from '../service/expense.service';
import { User } from '../user';
export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})



export class DialogboxComponent {
//   name!: string;

constructor(private router:Router, private service:ExpenseService){}

name:string='';
password:string=''
userList: User[] = [];
user: User = new User();


handleLogin()
{
  
  // this.router.navigate(['expenses']);
  this.service.getUser().subscribe(resp =>{
    this.userList = resp;
    console.log(resp);

    for(let i=0; i<this.userList.length; i++){
      if(this.userList[i].userName === this.user.userName && this.userList[i].password === this.user.password){
        console.log(this.userList[i].id);
        let id: number = this.userList[i].id;
        sessionStorage.setItem('name',this.userList[i].userName);
        sessionStorage.setItem('id', this.userList[i].id.toString());
          this.router.navigate(['expenses', id])
          return;
      }
    }
    alert("Incorrect username or password");

  })
  

}




}
