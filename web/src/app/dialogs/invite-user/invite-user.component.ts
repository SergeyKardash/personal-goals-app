import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GoalService } from "src/app/services/goal.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-invite-user",
  templateUrl: "./invite-user.component.html",
  styleUrls: ["./invite-user.component.scss"]
})
export class InviteUserComponent implements OnInit {
  userEmail: FormGroup;
  @ViewChild("email") email: ElementRef;
  goal;

  constructor(
    private goalService: GoalService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InviteUserComponent>,
    private router: Router
  ) {
    this.goal = this.data;
  }

  ngOnInit() {
    this.email.nativeElement.focus();
    this.userEmail = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onInvite() {
    if (this.userEmail.valid) {
      const email = this.userEmail.get("email").value;
      const hostname =
        location.protocol +
        "//" +
        location.hostname +
        (location.port ? ":" + location.port : "");
      const link = `${hostname}${this.router.url}?email=${email}`;
      if (this.goal.canComment.includes(email)) {
        this.goalService.sendEmail({email: email, link: link});
        this.dialogRef.close();
        return;
      }
      this.goal.canComment.push(email);
      this.goalService.updateGoal(this.goal).then(() => {
        this.goalService.sendEmail({email: email, link: link});
        this.dialogRef.close();
      });
    }
  }
}
