import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Chart,registerables} from 'chart.js';
import { DisplayEmployee } from 'src/app/models/display-employe.model';

Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
  @Input() employeesData: DisplayEmployee[] = [];
  public chart?: Chart;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeesData']) {
      // Destroy old chart instance if it exists
      if (this.chart) {
        this.chart.destroy();
      }
      // Create new chart with updated data
      this.createChart();
    }
  }

  createChart() {
    const data: any = {
      labels: this.employeesData.map(employee => employee.EmployeeName),
      datasets: [{
        label: 'Total Time in Month',
        data: this.employeesData.map(employee => employee.TotalTimeInMonth),//.slice(0, 10), // uncomment this line (.slice(0, 10)) to limit to 10 entries
        backgroundColor: [
          // Generate random colors for each employee
          ...this.employeesData.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`)
        ],
        hoverOffset: 4
      }]
    }

    const config = {
      type: 'pie',
      data: data,
      aspectRatio: 1,
    }

    this.chart = new Chart('myChart', config);
  }
}
