import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-goal-page',
  templateUrl: './add-goal-page.component.html',
  styleUrls: ['./add-goal-page.component.scss']
})
export class AddGoalPageComponent implements OnInit {
  addGoalForm: FormGroup;

  constructor( private router: Router) { }

  ngOnInit() {
    this.addGoalForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  onAddGoal() {
    console.log(this.addGoalForm.value);
    this.router.navigate(['']);
  }

  onCancel() {
    this.router.navigate(['']);
  }

}
