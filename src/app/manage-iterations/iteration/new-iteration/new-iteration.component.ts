import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-iteration',
  templateUrl: './new-iteration.component.html',
  styleUrls: ['./new-iteration.component.css'],
})
export class NewIterationComponent implements OnInit {
  @Input() iteration: any;

  constructor() {}

  ngOnInit(): void {}
}
