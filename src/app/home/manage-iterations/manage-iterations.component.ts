import { Component, OnInit } from '@angular/core';
import { Iteration } from 'src/app/Interfaces/iterations';

@Component({
  selector: 'app-manage-iterations',
  templateUrl: './manage-iterations.component.html',
  styleUrls: ['./manage-iterations.component.css'],
})
export class ManageIterationsComponent implements OnInit {
  iterations: Array<Iteration>;
  constructor() {
    this.iterations = new Array<Iteration>();
  }

  ngOnInit(): void {
    this.setIterations();
  }

  setIterations(): void {
    this.iterations = this.getIterations();
  }

  getIterations(): Array<Iteration> {
    const tempIterations: Array<Iteration> = new Array<Iteration>();
    for (let index = 0; index < 30; index++) {
      const newIteration: Iteration = {
        id: index,
        name: `Iteración ${index}`,
      };
      tempIterations.push(newIteration);
    }
    return tempIterations;
  }
}
