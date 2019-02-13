import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CommentService {
  URL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  updateComment(commentId, goalId, message) {
    return  this.httpClient.put(`${this.URL}/comment/${commentId}/${goalId}`, {message: message}).toPromise();
  }

  removeComment(commentId, goalId) {
    return  this.httpClient.delete(`${this.URL}/comment/${commentId}/${goalId}`).toPromise();
  }

}
