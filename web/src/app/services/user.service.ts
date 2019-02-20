import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$ = new BehaviorSubject<any>(null);

  URL = 'http://localhost:8080';

  constructor( private  httpClient: HttpClient) {
  }

  postUser$(profileInfo) {
    const user = {
      name: profileInfo.name,
      email: profileInfo.email
    };
    this.httpClient.post(`${this.URL}/user`, user).toPromise()
      .then((result: any) => {
        this.user$.next(result.user);
      });
  }

  getUser(userId) {
   return this.httpClient.get(`${this.URL}/user/${userId}`).toPromise();
  }
}
