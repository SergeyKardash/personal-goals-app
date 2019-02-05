import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-add-goal-page',
  templateUrl: './add-goal-page.component.html',
  styleUrls: ['./add-goal-page.component.scss']
})
export class AddGoalPageComponent implements OnInit {
  addGoalForm: FormGroup;

  constructor( private router: Router, private goalService: GoalService) { }

  ngOnInit() {
    this.addGoalForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  onAddGoal() {
    const goal = this.addGoalForm.value;
    this.goalService.postGoal(goal)
      .then(result => {
        this.router.navigate(['']);
      })
      .catch(err => console.log(err));
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
