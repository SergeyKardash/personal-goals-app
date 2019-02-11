import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  userEmail: FormGroup;
  @ViewChild('email') email: ElementRef;

  constructor() { }

  ngOnInit() {
    this.email.nativeElement.focus();
    this.userEmail = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onInvite() {
    if (this.userEmail.valid) {
      console.log(this.userEmail);
    }
  }

}
