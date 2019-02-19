import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-callback',
  template: ``,
  styles: []
})
export class CallbackComponent implements OnInit {

  constructor(public auth: AuthService) {
    auth.handleLoginCallback();
  }

  ngOnInit() {
  }

}
