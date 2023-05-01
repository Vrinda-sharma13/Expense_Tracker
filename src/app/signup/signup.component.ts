import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from '../service/expense.service';
import { User } from '../user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router:Router , private service: ExpenseService){}

  name:string='';
  password:string=''
  user: User = new User();

  handleSignIn(){
    this.service.saveUser(this.user).subscribe(resp =>{
        this.router.navigate(['home']);
    })
  }

 


 
}
