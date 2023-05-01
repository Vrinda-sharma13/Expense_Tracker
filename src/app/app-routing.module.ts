import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';
import { ChartComponent } from './component/chart/chart.component';
import { ListExpenseComponent } from './component/list-expense/list-expense.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {
    path:'expenses/:id',
    component:ListExpenseComponent
  },
 {
  path:'addexpense/:id',
  component:AddExpenseComponent
 },
 {
  path:'',
  redirectTo: '/home',
  pathMatch:'full'
 },
 {
  path: 'editexpense/:id', 
  component: AddExpenseComponent
 },
 {
  path: 'editexpense/:id/:eid', 
  component: AddExpenseComponent
 },
 {
  path: 'home',
  component:HomeComponent
 },
 {
  path:'dialog',
  component: DialogboxComponent
 },
 {
  path:'signup',
  component: SignupComponent
 },
 {
  path:'expenses/:id',
  component:ListExpenseComponent
},
{
  path:'chart',
  component:ChartComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
