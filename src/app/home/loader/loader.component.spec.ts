import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoaderState } from 'src/app/Interfaces/loader';
import { LoaderService } from 'src/app/services/loader.service';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [
        {
          provide: LoaderService,
          useValue: {
            loaderState: () => of({ show: true } as LoaderState),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    loaderService = TestBed.inject(LoaderService);
    loaderService.loaderState = of({ show: true } as LoaderState);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.show).toBeTrue();
  });
});
