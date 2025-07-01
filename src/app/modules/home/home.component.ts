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
    const employeMap = new Map<string, DisplayEmployee>();
    console.log('Calculating total hours for employees:', employees);
    employees.forEach(employe => {
      const id = employe.Id;
      const startDate = new Date(employe.StarTimeUtc);
      const endDate = new Date(employe.EndTimeUtc);
      const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
      const roundedHours = Math.round(hours);

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

    // Logic if you want to filter employees by the current month
    // const currentYear = new Date().getFullYear();
    // const currentMonth = new Date().getMonth();

    // employees.forEach(employe => {
    //   const id = employe.Id;
    //   const startDate = new Date(employe.StarTimeUtc);
    //   const endDate = new Date(employe.EndTimeUtc);
    //   if (startDate.getFullYear() === currentYear && startDate.getMonth() === currentMonth) {
    //     const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
    //     const roundedHours = Math.round(hours);

    //     if (employeMap.has(id)) {
    //       const existingEmployee = employeMap.get(id)!;
    //       existingEmployee.TotalTimeInMonth += hours;
    //     }
    //     else {
    //       employeMap.set(id, {
    //         Id: id,
    //         EmployeeName: employe.EmployeeName,
    //         TotalTimeInMonth: roundedHours
    //       });
    //     }
    //   }
    // });

    console.log(employeMap.values());
    return Array.from(employeMap.values());
    
  }

  editEmployee(id:string) {
    console.log('Edit employee with ID:', id);
    // Implement edit functionality here
  }
}
