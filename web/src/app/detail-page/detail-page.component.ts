import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeWhile, switchMap } from "rxjs/operators";
import { GoalService } from '../services/goal.service';
import { Goal } from '../models/goal.model';

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

  @ViewChild('goalTitle') goalTitle: ElementRef;
  @ViewChild('goalDescription') goalDescription: ElementRef;

  constructor( private router: Router, private route: ActivatedRoute, private goalService: GoalService ) { }

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
    this.goal.title = title;
    this.goal.description = description;
    this.goalService.updateGoal(this.goal)
      .then((result) => {
        this.editMode = false;
      });
  }

  onRemove() {
    this.goalService.removeGoal(this.goal._id)
      .then((result) => {
        this.router.navigate(['']);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
