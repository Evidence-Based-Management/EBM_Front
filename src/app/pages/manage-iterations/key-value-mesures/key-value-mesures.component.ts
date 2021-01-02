import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'key-value-mesures',
  templateUrl: './key-value-mesures.component.html',
})
export class KeyValueMesuresComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() value: string;
  @Output() valueChanged = new EventEmitter<string>();
  @Input() helpText: string;
  @Input() status: string;

  constructor() {}

  ngOnInit(): void {}

  onChange(): void {
    this.valueChanged.emit(this.value);
  }
}
