import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IterationComponent } from './iteration.component';

describe('IterationComponent', () => {
  let component: IterationComponent;
  let fixture: ComponentFixture<IterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IterationComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
