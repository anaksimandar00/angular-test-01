import { Component } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Employee } from 'src/app/models/employee.model';
import { DisplayEmployee } from 'src/app/models/display-employe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public employees:DisplayEmployee[] = [];
  constructor(private restService:RestService) { }

  ngOnInit() {
    this.restService.getAll('gettimeentries').subscribe(
      (data) => {
        //console.log(data);  
        this.employees = this.calculateTotalHours(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  calculateTotalHours(employees: Employee[]): DisplayEmployee[] {
    const employeMap = new Map<number, DisplayEmployee>();

    employees.forEach(employe => {
      const id = employe.Id;
      const startDate = new Date(employe.StarTimeUtc);
      const endDate = new Date(employe.EndTimeUtc);
      //console.log(startDate.getTime());
      //console.log(endDate.getTime())
      const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
      const roundedHours = Math.round(hours * 100) / 100; // round to 2 decimal places

      if (employeMap.has(id)) {
        const existingEmployee = employeMap.get(id)!;
        existingEmployee.TotalTimeInMonth += hours;
      } 
      else {
        employeMap.set(id, {
          Id: id,
          EmployeeName: employe.EmployeeName,
          TotalTimeInMonth: roundedHours
        });
      }
    });

    console.log(employeMap.values());
    return Array.from(employeMap.values());
    
  }

  editEmployee(id:number) {
    console.log('Edit employee with ID:', id);
    // Implement edit functionality here
  }
}
