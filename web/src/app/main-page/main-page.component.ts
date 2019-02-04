import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor( private  httpClient: HttpClient ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/goals').subscribe(v => console.log(v));
  }

}
