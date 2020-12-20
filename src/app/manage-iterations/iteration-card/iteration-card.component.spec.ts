import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationCardComponent } from './iteration-card.component';

describe('IterationCardComponent', () => {
  let component: IterationCardComponent;
  let fixture: ComponentFixture<IterationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IterationCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected value', () => {
    spyOn(component.selectionChange, 'emit');

    component.onChange('Completed');
    expect(component.selectionChange.emit).toHaveBeenCalled();
  });
});
