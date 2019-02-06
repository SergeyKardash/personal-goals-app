import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { GoalService } from "../services/goal.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  goals$;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private goalService: GoalService
  ) {}

  ngOnInit() {
    this.goals$ = this.goalService.getGoals$();
  }

  navigateOnAddGoal() {
    this.router.navigate(["add-goal"]);
  }

  navigateOnGoalDetails(id) {
    this.router.navigate(["goal", id], { relativeTo: this.route });
  }
}
