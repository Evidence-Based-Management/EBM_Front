import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';
import { Iteration } from 'src/app/Interfaces/iterations';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageIterationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIterationsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get at least iterations', () => {
    
    // Arrange
    fixture.detectChanges();

    //  Act
    component.setIterations();

    // Assert
    expect(component.iterations.length).toBeGreaterThan(1);
  });

  it('should get empty iterations', () => {
    // Arrange
    spyOn(component, 'getIterations').and.returnValue(new Array<Iteration>());
    fixture.detectChanges();

    // AA
    expect(component.iterations.length).toBe(0);
  });
});
