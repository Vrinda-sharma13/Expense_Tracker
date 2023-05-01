import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/model/expense';
import { ExpenseService } from 'src/app/service/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {

  expense: Expense = new Expense();
  userId:number=-1;
  eid:number=-1;
  editExpense:Expense=new Expense();
  valid:boolean=false;
constructor(
  private _expenseService: ExpenseService,
  private _router:Router,
  private _activatedRoute: ActivatedRoute){

}
ngOnInit(): void{
  this.userId=this._activatedRoute.snapshot.params['id'];
this.eid = this._activatedRoute.snapshot.params['eid'];

if(this.eid){
  this._expenseService.getExpense(this._activatedRoute.snapshot.params['eid']).subscribe(data=>{
    console.log(data);
    if(data.description.length!==0){this.valid=true};
    this.editExpense=data;
    console.log(this.editExpense);
    this.expense=this.editExpense;
    this.expense.id = this.editExpense.id;
  },

  );
  
}

}

saveExpense(){
 this.expense.userId= this.userId;
  console.log(this.expense.description+"###############"+this.expense.userId);
  console.log(this.expense + "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  
  this._expenseService.saveExpense(this.expense).subscribe(
    data => {
      console.log('response',data);
      this._router.navigate(['expenses',this._activatedRoute.snapshot.params['id']])
    }
  )
  
  
}


deleteExpense(id:number){
  this._expenseService.deleteExpense(id).subscribe(
    data =>{
      alert("expense deleted");
      console.log('deleted response',data);
      this._router.navigateByUrl('/expenses');
    }
  )
}

addExpense = new FormGroup({
  expenseName: new FormControl("",[Validators.required]),
  amount: new FormControl("",[Validators.required]),
  description:new FormControl("",[Validators.required]),
date: new  FormControl("",[Validators.required])
});
get expenseName(): FormControl{
  return this.addExpense.get("expenseName") as FormControl;

}
get amount(): FormControl{
  return this.addExpense.get("amount") as FormControl;

}
get description(): FormControl{
  return this.addExpense.get("description") as FormControl;

}
get date(): FormControl{
  return this.addExpense.get("date") as FormControl;

}

}
