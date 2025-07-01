import { Component } from '@angular/core';
import { RestService } from '../rest/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private restService:RestService) { }

  ngOnInit() {
    this.restService.getAll('timeentries').subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
