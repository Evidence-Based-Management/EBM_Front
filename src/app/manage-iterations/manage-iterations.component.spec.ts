import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Iteration, Iterations } from '../Interfaces/iterations';
import { IterationsService } from '../services/iterations.service';
import { of } from 'rxjs';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;
  let iterationsService: IterationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageIterationsComponent],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getJsonIterations: () =>
              of({ iterations: [{ id: '-1', name: 'Fake' }] }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIterationsComponent);
    component = fixture.componentInstance;
    iterationsService = TestBed.inject(IterationsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get at least iterations', () => {
    // Arrange
    spyOn(iterationsService, 'getJsonIterations').and.callThrough();
    fixture.detectChanges();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(1);
  });

  it('should get empty iterations', () => {
    // Arrange
    spyOn(iterationsService, 'getJsonIterations').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();
    // AA
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should get empty iterations - getIterations()', () => {
    // Arrange
    spyOn(iterationsService, 'getJsonIterations').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();

    // Act
    component.getIterations();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should has 2 iterations when call setLocalIterations()', () => {
    // Arrange
    const fakeIterations: Iterations = {
      iterations: [
        { id: '-1', name: 'Fake' },
        { id: '-2', name: 'Fake 2' },
      ],
    };

    // Act
    component.setLocalIterations(fakeIterations);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(2);
  });

  it('should return a new Iteration - newIteration()', () => {
    // Arrange
    const fakeIterations: Iterations = {
      iterations: [
        { id: '-1', name: 'Fake' },
        { id: '-2', name: 'Fake 2' },
      ],
    };

    // Act
    const newIteration = component.newIteration(fakeIterations, 0);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
    expect(newIteration.id).toBe('-1');
    expect(newIteration.name).toBe('Fake');
  });
});
