import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueMesuresComponent } from './key-value-mesures.component';

describe('KeyValueMesuresComponent', () => {
  let component: KeyValueMesuresComponent;
  let fixture: ComponentFixture<KeyValueMesuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyValueMesuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValueMesuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
