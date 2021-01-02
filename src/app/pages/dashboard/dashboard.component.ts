import { Component, OnInit } from '@angular/core';
import { IterationsService } from '../../services/iterations.service';
import { Iteration } from '../../Interfaces/iterations';
import { IterationMappers } from '../../utilities/mappers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  iteration: Iteration;

  constructor(public serviceItertations: IterationsService) {}

  ngOnInit(): void {
    this.serviceItertations.getLastIterationByTeam(2).subscribe((iteration) => {
      this.iteration = IterationMappers.mapToIteration(iteration);
    });
  }
}
