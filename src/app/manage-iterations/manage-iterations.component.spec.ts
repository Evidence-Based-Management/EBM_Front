import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';
import { Iteration, Iterations } from '../Interfaces/iterations';
import { IterationsService } from '../services/iterations.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { Router } from '@angular/router';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;
  let iterationsService: IterationsService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageIterationsComponent],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getIterations: () =>
              of({ iterations: [{ id: '-1', name: 'Fake' }] }),
          },
        },
        { provide: Router, useValue: routerSpy },
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
    spyOn(iterationsService, 'getIterations').and.callThrough();
    fixture.detectChanges();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(1);
  });

  it('should get empty iterations', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();
    // AA
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should get empty iterations - getIterations()', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
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

  it('should return a new Iteration - goToIterationDetails()', () => {
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

  it('should navigate to iteration', () => {
    // Act
    component.goToIterationDetails('1');

    // args passed to router.navigateByUrl() spy
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    // // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/iteration', '1']);
    expect(navArgs).toEqual(['/iteration', '1']);
  });

  it('should has 3 html cards', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          { id: '-1', name: 'Fake' },
          { id: '-2', name: 'Fake 2' },
          { id: '-3', name: 'Fake 3' },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(By.css('.card'));

    // Assert
    expect(result.length).toBe(3);
  });
});
