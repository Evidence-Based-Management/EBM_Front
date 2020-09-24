import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration, Iterations } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
})
export class IterationComponent implements OnInit {
  idIteration;
  iteration: Iteration;
  constructor(
    public serviceItertations: IterationsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idIteration = this.route.snapshot.paramMap.get('id');
    this.getIteration();
  }

  getIteration() {
    this.serviceItertations
      .getIterationById(this.idIteration)
      .subscribe((response: Iterations) => {
        this.iteration = response.iterations[0];
      });
  }
}
