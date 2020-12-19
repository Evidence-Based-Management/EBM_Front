import { Component, Input, OnInit } from '@angular/core';
import { Iteration } from 'src/app/Interfaces/iterations';

@Component({
  selector: 'app-iteration-card',
  templateUrl: './iteration-card.component.html',
})
export class IterationCardComponent implements OnInit {
  @Input() iteration: Iteration;
  @Input() isDetail: boolean;

  constructor() {}

  ngOnInit(): void {}
}
