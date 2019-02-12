import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  URL = 'http://localhost:8080';

constructor( private  httpClient: HttpClient) { }

getGoals$() {
  let goals;
  goals = this.httpClient.get<[Goal]>(`${this.URL}/goals`).pipe(
    map((res: any) => {
      return res.goals;
    })
  );
  return goals;
}

getGoal$(id) {
  let goal;
  goal = this.httpClient.get<Goal>(`${this.URL}/goal/${id}`).pipe(
    map((res: any) => {
      return res.goal;
    })
  );
  return goal;
}

postGoal(goal: Goal) {
  return this.httpClient.post(`${this.URL}/goal`, goal).toPromise();
}

updateGoal(goal: Goal) {
  return this.httpClient.put(`${this.URL}/goal/${goal._id}`, goal).toPromise();
}

removeGoal(goalId) {
  return this.httpClient.delete(`${this.URL}/goal/${goalId}`).toPromise();
}

addComment(goalId, comment) {
  return this.httpClient.put(`${this.URL}/goal/${goalId}`, comment).toPromise();
}

sendEmail(data) {
  return this.httpClient.post(`${this.URL}/sendEmail`, data).toPromise();
}

}
