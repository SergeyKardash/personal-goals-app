import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  URL = 'http://localhost:8080';

constructor( private  httpClient: HttpClient) { }

getGoals$() {
  let goals;
  goals = this.httpClient.get(`${this.URL}/goals`).pipe(
    map((values: any) => {
      return values.goals;
    })
  );
  return goals;
}

postGoal(goal) {
  return this.httpClient.post(`${this.URL}/goal`, goal).toPromise()
}

}
