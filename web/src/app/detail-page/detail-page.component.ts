import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeWhile } from "rxjs/operators";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  alive = true;
  id: number;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive)
    ).subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
