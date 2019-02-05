import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

constructor( private  httpClient: HttpClient) { }

getGoals() {
  this.httpClient.get('http://localhost:8080/goals').subscribe(v => console.log(v));
}

}
