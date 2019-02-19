import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalService } from '../services/goal.service';
import { Goal } from '../models/goal.model';

@Component({
  selector: 'app-add-goal-page',
  templateUrl: './add-goal-page.component.html',
  styleUrls: ['./add-goal-page.component.scss']
})
export class AddGoalPageComponent implements OnInit {
  addGoalForm: FormGroup;

  @ViewChild('title') title: ElementRef;

  constructor( private router: Router, private goalService: GoalService) { }

  ngOnInit() {
    this.title.nativeElement.focus();
    this.addGoalForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null)
    });
  }

  onAddGoal() {
    if (this.addGoalForm.valid) {
      const goal: Goal = this.addGoalForm.value;
      this.goalService.postGoal(goal)
        .then(result => {
          this.router.navigate(['goals']);
        })
        .catch(err => console.log(err));
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
