import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile, switchMap } from "rxjs/operators";
import { GoalService } from '../services/goal.service';
import { Goal } from '../models/goal.model';
import { MatSelect, MatDialog } from '@angular/material';
import { InviteUserComponent } from '../dialogs/invite-user/invite-user.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  alive = true;
  id: number;
  goal: Goal;
  editMode = false;
  statuses = ['Met', 'Surpassed', 'Failed'];
  showComments = false;

  @ViewChild('goalTitle') goalTitle: ElementRef;
  @ViewChild('goalDescription') goalDescription: ElementRef;
  @ViewChild('goalStatus') goalStatus: MatSelect;

  constructor( private router: Router, private route: ActivatedRoute, private goalService: GoalService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive),
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.goalService.getGoal$(this.id);
      })
    ).subscribe((goal: Goal) => {
      this.goal = goal;
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
      .then((result) => {
        this.editMode = false;
      });
  }

  inviteUserForFeedback() {
    const dialogRef = this.dialog.open(InviteUserComponent, {
      width: '500px',
      data: this.goal
    });
  }

  onRemove() {
    this.goalService.removeGoal(this.goal._id)
      .then((result) => {
        this.router.navigate(['']);
      });
  }

  onClose() {
    this.router.navigate(['']);
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
