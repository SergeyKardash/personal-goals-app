import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { GoalService } from "../services/goal.service";
import { Goal } from "../models/goal.model";
import { UserService } from "../services/user.service";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-add-goal-page",
  templateUrl: "./add-goal-page.component.html",
  styleUrls: ["./add-goal-page.component.scss"]
})
export class AddGoalPageComponent implements OnInit {
  addGoalForm: FormGroup;
  userId;

  @ViewChild("title") title: ElementRef;

  constructor(
    private router: Router,
    private goalService: GoalService,
    private userService: UserService,
    private snotifyService: SnotifyService
  ) {
    this.userService.user$.subscribe(user => (this.userId = user._id));
  }

  ngOnInit() {
    this.title.nativeElement.focus();
    this.addGoalForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });
  }

  onAddGoal() {
    if (this.addGoalForm.valid) {
      const goal: Goal = this.addGoalForm.value;
      goal.creator = this.userId;
      this.goalService
        .postGoal(goal)
        .then((result: any) => {
          this.snotifyService.success(`'${result.goal.title}' successfully created`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true
          });
          this.router.navigate(["goals"]);
        })
        .catch(err => {
          this.snotifyService.error(`Something went wrong. Please try again`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true
          });
        });
    }
  }

  onCancel() {
    this.router.navigate([""]);
  }
}
