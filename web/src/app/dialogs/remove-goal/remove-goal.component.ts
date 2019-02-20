import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GoalService } from "src/app/services/goal.service";
import { Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-remove-goal",
  templateUrl: "./remove-goal.component.html",
  styleUrls: ["./remove-goal.component.scss"]
})
export class RemoveGoalComponent implements OnInit {
  goal;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<RemoveGoalComponent>,
    private goalService: GoalService,
    private router: Router,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.goal = this.data;
  }

  onRemove() {
    this.goalService.removeGoal(this.goal._id)
    .then(result => {
      this.snotifyService.success(`'${this.goal.title}' successfully removed`, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true
      });
      this.dialogRef.close();
      this.router.navigate(["goals"]);
    })
    .catch((err) => {
      this.snotifyService.error(`Something went wrong. Please try again`, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true
      });
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
