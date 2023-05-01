import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/service/expense.service';
import { Expense } from 'src/app/model/expense';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/budget';
import { MatDialog } from '@angular/material/dialog';
import { CheckBalanceComponent } from 'src/app/check-balance/check-balance.component';


@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit{

  id:number;
  userId: number;
  expenses: Expense[] =[];
totalAmount:number=0;
budget: Budget = new Budget();
userBudget: number;

BudgetExceeded: boolean;
  filters = {
keyword: '',
date:'',
sortBy: 'expense'
  }
  
name:any='';
  
constructor (private _expenseService: ExpenseService, private activated: ActivatedRoute, private route:Router, private dialog: MatDialog){

}
ngOnInit(): void{
  this.id = this.activated.snapshot.params['id'];
  console.log(this.id);
  this.name=sessionStorage.getItem('name');
  // this.userBudget = parseInt(sessionStorage.getItem('UserBudget'));
  this._expenseService.getBudgetByUserId(this.id).subscribe(data=>{
      this.budget = data;
    
  })
 this.ListExpenses();


}

deleteExpense(id:number){
  this._expenseService.deleteExpense(id).subscribe(
    data=>{
      // alert("Deleted ")
      console.log('deleted response', data);
     this.ListExpenses();
    }
  )
}


ListExpenses(){
  console.log(this.id+"iddddddddd");
  this._expenseService.getByUserId(this.id).subscribe(
    data => {
      console.log(data);
      this.expenses = this.filterExpenses(data);
     
      this.totalAmount = this.expenses.reduce((total, expense) => total + expense.amount, 0);
      sessionStorage.setItem('totalAmount', this.totalAmount.toString());

      this.checkBudgetExceeded();
      let budgetAmountEl = document.getElementById('budgetAmount');
      if (this.BudgetExceeded) {
        budgetAmountEl.style.backgroundColor = '#d2635d';
      } else {
        budgetAmountEl.style.backgroundColor = '#b1d6dd';
      }
     
    }
  );
}


 onSubmit(){
  console.log("qqqqqqqqqqqqqq" + this.budget.amount);
  // this.budget2.amount = this.budget.amount
  this.budget.userId = parseInt(sessionStorage.getItem("id"));
  
  sessionStorage.setItem("UserBudget", this.budget.amount.toString());
  this.userBudget = parseInt(sessionStorage.getItem('UserBudget'));
   this._expenseService.saveBudget(this.budget).subscribe(

  {
    next: (data:any)=>{
      console.log("succees");
      
    },
    error:(error)=>{
      console.log(error);
      
    }
  }


   
   )
 }
 checkBudgetExceeded() {
  this.BudgetExceeded = this.totalAmount > this.budget.amount;
  if (this.BudgetExceeded) {
    alert('Your expenses have exceeded the budget!');
   
  }
}





handleEdit(eid:number){
  this.route.navigate(['editexpense',this.id,eid])
}

handleLogOut(){
  // sessionStorage.removeItem("UserBudget");
  sessionStorage.removeItem("UserBudget");
  this.route.navigate(['/home']);
}

navigate(){
  this.route.navigate(['/addexpense', this.id]);
}



filterExpenses(expenses:Expense[]){

return expenses.filter((e) =>{
  if(e.expense!=null){
    const formattedDate = new Date(e.date).toISOString().slice(0,10);

  return( e.expense.toLowerCase().includes(this.filters.keyword.toLowerCase())
  
  && new Date(e.date).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-').includes(this.filters.date)

        );
  }
  return false;
})
.sort((a,b) => {
  console.log('a:', a, 'b:', b, 'sortBy:', this.filters.sortBy);
  if(this.filters.sortBy ==='expense'){
return a.expense.toLowerCase() < b.expense.toLowerCase() ? -1: 1;
  }
  else if(this.filters.sortBy === 'amount'){
return a.amount < b.amount ? -1:1;
  }
  else if(this.filters.sortBy === 'date'){
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
 
  return 0;
});
}
checkBalance(): void{
  const dialogRef = this.dialog.open(CheckBalanceComponent, {
    width: '500px',
    
  });

}

}
