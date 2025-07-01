import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiKey: string;
  private apiUrl: string;;

  constructor(
    private httpClient:HttpClient) {
      this.apiKey = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
      this.apiUrl = `https://rc-vault-fap-live-1.azurewebsites.net/api`
    }

  getAll(url: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.apiUrl}/${url}?code=${this.apiKey}`);
  }
}
