import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { takeWhile, switchMap } from "rxjs/operators";
import { GoalService } from "../services/goal.service";
import { Goal } from "../models/goal.model";
import { MatSelect, MatDialog } from "@angular/material";
import { InviteUserComponent } from "../dialogs/invite-user/invite-user.component";
import { CommentService } from "../services/comment.service";
import { UserService } from "../services/user.service";
import { SnotifyService } from "ng-snotify";
import { RemoveGoalComponent } from "../dialogs/remove-goal/remove-goal.component";

@Component({
  selector: "app-detail-page",
  templateUrl: "./detail-page.component.html",
  styleUrls: ["./detail-page.component.scss"]
})
export class DetailPageComponent implements OnInit, OnDestroy {
  alive = true;
  id: number;
  goal: Goal;
  comments = [];
  editMode = false;
  statuses = ["Met", "Surpassed", "Failed"];
  showComments = false;
  feedbackUserEmail: string;
  showCreateComment = false;
  now = Date.now();
  isCreator = false;

  @ViewChild("goalTitle") goalTitle: ElementRef;
  @ViewChild("goalDescription") goalDescription: ElementRef;
  @ViewChild("goalStatus") goalStatus: MatSelect;
  @ViewChild("commentMessage") commentMessage: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private goalService: GoalService,
    private commentService: CommentService,
    public dialog: MatDialog,
    public userService: UserService,
    private snotifyService: SnotifyService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        takeWhile(() => this.alive),
        switchMap((params: Params) => {
          this.id = params["id"];
          return this.goalService.getGoal$(this.id);
        }),
        switchMap((goal: Goal) => {
          this.goal = goal;
          this.comments = goal.comments.reverse();
          return this.userService.user$;
        }),
        switchMap((user: any) => {
          if (user) {
            this.isCreator = this.goal.creator === user._id ? true : false;
          }
          return this.route.queryParams;
        })
      )
      .subscribe((params: Params) => {
        this.feedbackUserEmail = params["email"];
        const canComment = this.goal.canComment.includes(
          this.feedbackUserEmail
        );
        if (canComment) {
          this.showCreateComment = true;
          const checkCommentMessage = setInterval(() => {
            if (this.commentMessage) {
              this.commentMessage.nativeElement.focus();
              clearInterval(checkCommentMessage);
            }
          }, 100);
        } else {
          if (!this.isCreator) {
            this.router.navigate(['/']);
          }
        }
      });
  }

  onEditMode() {
    this.editMode = true;
  }

  onSave() {
    const title = this.goalTitle.nativeElement.value;
    const description = this.goalDescription.nativeElement.value;
    const status = this.goalStatus.value;
    this.goal.title = title;
    this.goal.description = description;
    this.goal.status = status;
    this.goalService.updateGoal(this.goal)
    .then((result: any) => {
      this.editMode = false;
      this.snotifyService.success(`'${result.goal.title}' successfully updated`, {
        timeout: 3000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true
      });
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

  inviteUserForFeedback() {
    const dialogRef = this.dialog.open(InviteUserComponent, {
      width: "500px",
      data: this.goal
    });
  }

  onRemove() {
    const dialogRef = this.dialog.open(RemoveGoalComponent, {
      width: "500px",
      data: this.goal
    });
  }

  onClose() {
    this.router.navigate(["goals"]);
  }

  onToggleComments() {
    this.showComments = !this.showComments;
  }

  onAddComment() {
    const comment = {
      message: this.commentMessage.nativeElement.value,
      userEmail: this.feedbackUserEmail
    };
    this.goalService.addComment(this.goal._id, comment)
    .then((result: any) => {
      this.goal = result.goal;
      this.comments = this.goal.comments.reverse();
      this.showComments = true;
      this.commentMessage.nativeElement.value = '';
    });
  }

  onEditComment(comment) {
    comment.editMode = true;
  }

  onSaveComment(comment) {
    const textArea = document.getElementById(`${comment._id}`) as HTMLTextAreaElement;
    const message = textArea.value;
    this.commentService.updateComment(comment._id, this.goal._id, message).then((result: any) => {
      this.goal = result.goal;
      this.comments = this.goal.comments.reverse();
      comment.editMode = false;
    });
  }

  onRemoveComment (comment) {
    this.commentService.removeComment(comment._id, this.goal._id).then((result: any) => {
      this.goal = result.goal;
      this.comments = this.goal.comments.reverse();
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
