// import { Component,ViewChild, ElementRef } from '@angular/core';
// import { ExpenseService } from 'src/app/service/expense.service';
// import {Chart} from 'chart.js'
// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent {
// chartdata={
//          labels:[],
//          datasets:[
//           {
            
//           }
//          ]
// }
//   constructor(private expenseService: ExpenseService) { }

//   ngOnInit() {
//  this.expenseService.getExpenses().subscribe(expenses=>{

//   this.chartdata = {
//     labels:  expenses.map(expense =>expense.date),
//     datasets:[{
//       data:  expenses.map(expense=> expense.amount),
//       type: 'line',
//       label: "Expenses",
//       fill: true,
//       borderColor: 'black',
//       backgroundColor: ' rgb(21, 78, 113)'
//     }]
//   };
//   console.log(this.chartdata);
  
//  });
// }
// }

  
  
 
        
        
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/service/expense.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild('myChart') myChart: ElementRef;

  chart: Chart;
  userId: number;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpenses(this.userId).subscribe(expenses => {
      const labels = expenses.map(expense => expense.date);
      const data = expenses.map(expense => expense.amount);

      this.chart = new Chart(this.myChart.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Expenses',
              data: data,
              
              borderColor: 'black',
              backgroundColor: 'rgb(21, 78, 113)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });
  }

}
