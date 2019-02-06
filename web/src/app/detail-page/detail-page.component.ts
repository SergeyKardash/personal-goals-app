import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor( private route: ActivatedRoute, private goalService: GoalService ) { }

  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive),
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.goalService.getGoal$(this.id);
      })
    ).subscribe((goal: Goal) => {
      this.goal = goal;
      console.log(goal);
    });
  }

  onEditMode() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
  }

  onRemove() {
    
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
