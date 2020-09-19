import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
})
export class IterationComponent implements OnInit {
  idIteration;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idIteration = this.route.snapshot.paramMap.get('id');
  }
}
