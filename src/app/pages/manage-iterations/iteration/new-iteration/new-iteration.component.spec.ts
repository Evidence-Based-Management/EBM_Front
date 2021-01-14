import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIterationComponent } from './new-iteration.component';

describe('NewIterationComponent', () => {
  let component: NewIterationComponent;
  let fixture: ComponentFixture<NewIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIterationComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
