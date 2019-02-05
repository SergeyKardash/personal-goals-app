import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor( private  httpClient: HttpClient, private router: Router ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/goals').subscribe(v => console.log(v));
  }

  navigateOnAddGoal() {
    this.router.navigate(['add-goal'])
  }

}
