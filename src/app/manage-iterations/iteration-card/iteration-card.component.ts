import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iteration } from 'src/app/Interfaces/iterations';

@Component({
  selector: 'app-iteration-card',
  templateUrl: './iteration-card.component.html',
})
export class IterationCardComponent implements OnInit {
  @Input() iteration: Iteration;
  @Input() isDetail: boolean;
  @Output() selectionChange = new EventEmitter<string>();

  states: string[] = ['In_Progress', 'Completed', 'Fail'];
  selected = 'In_Progress';

  constructor() {}

  ngOnInit(): void {}

  onChange(selected): void {
    this.selectionChange.emit(selected);
  }
}
