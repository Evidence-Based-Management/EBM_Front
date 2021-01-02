import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { KeyValueMesuresComponent } from './key-value-mesures.component';
import { FormsModule } from '@angular/forms';

describe('KeyValueMesuresComponent', () => {
  let component: KeyValueMesuresComponent;
  let fixture: ComponentFixture<KeyValueMesuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyValueMesuresComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueMesuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a value ', () => {
    component.onChange();
    const valueChanged = new EventEmitter<string>();
    expect(component.valueChanged).toEqual(valueChanged);
  });
});
