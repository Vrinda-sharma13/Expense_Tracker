import { Component } from '@angular/core';
import { Budget } from '../budget';
import { ListExpenseComponent } from '../component/list-expense/list-expense.component';
import { ExpenseService } from '../service/expense.service';
@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent {


  constructor(private service: ExpenseService){}

  totalAmount: any = sessionStorage.getItem('totalAmount');
  // totalBudget: any = sessionStorage.getItem('UserBudget');

  budget: Budget = new Budget();
  balance: number;
  userId: number;
  ngOnInit(){
    this.userId = parseInt(sessionStorage.getItem('id'));
    this.service.getBudgetByUserId(this.userId).subscribe(data=>{
      this.budget = data;
      this.balance = this.budget.amount - this.totalAmount;
      console.log(this.budget.amount + "bbbbbbbb" + this.totalAmount);
    })

    
  }


}
