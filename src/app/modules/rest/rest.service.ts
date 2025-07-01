import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiKey: string;
  private apiUrl: string;;

  constructor(
    private httpClient:HttpClient) {
      this.apiKey = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=="
      this.apiUrl = `https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=${this.apiKey}`
    }

  getAll(url:string):Observable<any> {
    return this.httpClient.get(`${this.apiUrl}`);
  }
}
