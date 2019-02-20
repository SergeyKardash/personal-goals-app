import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { GoalService } from "../services/goal.service";
import { UserService } from "../services/user.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit, OnDestroy {
  goals;
  user;
  alive = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private goalService: GoalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.user$.pipe(
      takeWhile(() => this.alive)
    ).subscribe(user => {
      if (user) {
        this.userService
          .getUser(user._id)
          .then((v: any) => {
            this.user = v.user;
            this.goals = this.user.goals;
          });
      }
    });
  }

  navigateOnAddGoal() {
    this.router.navigate(["add-goal"]);
  }

  navigateOnGoalDetails(id) {
    this.router.navigate(["goal", id]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
