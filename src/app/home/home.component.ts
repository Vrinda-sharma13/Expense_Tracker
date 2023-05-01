import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

constructor(private dialog: MatDialog){}
openDialog(): void {
  const dialogRef = this.dialog.open(DialogboxComponent, {
    width: '500px',
    
  });
}
openSignup(): void{
  const dialogRef = this.dialog.open(SignupComponent,{
    width:'500px',
  });
}
}
