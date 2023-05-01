import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Expense } from '../model/expense';
import { User } from '../user';
import { Budget } from '../budget';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private geturl: string = "http://localhost:8080/api/v1/expenses"
  constructor(private _httpClient: HttpClient) { }

  getExpenses(id:number): Observable<Expense[]>{
return this._httpClient.get<Expense[]>(this.geturl)
// .pipe(
  
//   map(response => response)
// )
  }

saveExpense(expense: Expense): Observable<Expense>{
  return this._httpClient.post<Expense>(this.geturl, expense);
}
  getExpense(id: number): Observable<Expense>{
    return this._httpClient.get<Expense>(`${this.geturl}/${id}`).pipe(
      map(response=> response)
    )
  }
  editExpense(id:number): Observable<any>{
    return this._httpClient.put(`${this.geturl}/${id}`, {responseType: 'number'});
  }
  // editExpense(id:number): Observable<any>{
  //   return this._httpClient.put<Expense>("http://localhost:8080/api/v1/update/expenses" + id, Expense);
  // }

  deleteExpense( id:number):Observable<any>{
    return this._httpClient.delete(`${this.geturl}/${id}`, {responseType: 'text'});
  }
  
  saveUser(user: User):Observable<any>{
    return this._httpClient.post<User>('http://localhost:8080/saveUser', user);
  }

  getUser():Observable<any>{
    return this._httpClient.get<User>("http://localhost:8080/getUser")
  }

  getByUserId(id:number):Observable<any>{
    return this._httpClient.get<Expense>("http://localhost:8080/api/v1/getByUserId/"+id)
  }

getBudgetByUserId(id:number):Observable<any>{
  return this._httpClient.get<Budget>("http://localhost:8080/get/"+id)
}

saveBudget(budget: Budget):Observable<Budget>{
  return this._httpClient.post<Budget>("http://localhost:8080/save", budget)
}

getMonthByUserId(id:number):Observable<any>{
  return this._httpClient.get<Expense>("http://localhost:8080/getMonthByUserId/"+id)
}

}

