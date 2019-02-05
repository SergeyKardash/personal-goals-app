import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor( private  httpClient: HttpClient, private router: Router, private goalService: GoalService ) { }

  ngOnInit() {
    this.goalService.getGoals()
  }

  navigateOnAddGoal() {
    this.router.navigate(['add-goal'])
  }

}
