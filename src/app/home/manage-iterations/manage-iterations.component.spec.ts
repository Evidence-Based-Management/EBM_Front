import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIterationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIterationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
