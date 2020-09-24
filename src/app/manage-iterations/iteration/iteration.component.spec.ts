import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Iteration } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';

import { IterationComponent } from './iteration.component';

describe('IterationComponent', () => {
  let component: IterationComponent;
  let fixture: ComponentFixture<IterationComponent>;
  let iterationsService: IterationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IterationComponent],
      imports: [AppRoutingModule],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getIterationById: () =>
              of({
                iterations: [
                  {
                    id: '-1',
                    name: 'Fake',
                    goal: 'sprint goal -1',
                    startDate: '01/01/2020',
                    endDate: '01/31/2020',
                    status: 'Completed',
                  },
                ],
              }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationComponent);
    component = fixture.componentInstance;
    iterationsService = TestBed.inject(IterationsService);
  });

  it('should create', () => {
    // Arrange
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-success')
    );

    const name = fixture.debugElement.queryAll(
      By.css('.h4.mb-0.font-weight-bold.text-gray-800')
    );

    const goal = fixture.debugElement.queryAll(By.css('.blockquote-footer'));

    // Assert
    expect(result.length).toBe(1);
    expect(name[0].nativeElement.innerHTML).toBe(' Fake ');
    expect(goal[0].nativeElement.innerHTML).toBe('sprint goal -1');

    expect(component).toBeTruthy();
  });

  it('should get empty iterations - getIterationById()', () => {
    // Arrange
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();

    // Act
    component.getIteration();

    // Assert
    expect(component.iteration).toBeUndefined();
  });

  it('should get an iteration - getIterationById()', () => {
    // Arrange
    const iterationFake = {
      iterations: [
        {
          id: '-1',
          name: 'Fake',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/31/2020',
          status: 'Completed',
        },
      ],
    };

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    fixture.detectChanges();

    // Act
    component.getIteration();

    // Assert
    expect(component.iteration).toEqual(iterationFake.iterations[0]);
  });
});
