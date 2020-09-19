import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration } from 'src/app/Interfaces/iterations';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css'],
})
export class IterationComponent implements OnInit {
  idIteration;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idIteration = this.route.snapshot.paramMap.get('id');
  }
}
