import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'key-value-mesures',
  templateUrl: './key-value-mesures.component.html'  
})
export class KeyValueMesuresComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() value: string;
  @Input() helpText: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
