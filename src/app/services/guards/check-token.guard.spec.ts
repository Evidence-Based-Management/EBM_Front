import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from '../authentication/auth.service';

import { CheckTokenGuard } from './check-token.guard';

describe('CheckTokenGuard', () => {
  let guard: CheckTokenGuard;
  let authService: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            token:
              'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YXJpMiIsImlhdCI6MTYxMDc0Mzg1MCwiZXhwIjoxNjEwNzc5ODUwfQ.1p4C_Wh-4UWaDx19KlhPMg5Q6b9-HSKKDxvGrupzt9I',
            renewToken: () => of({}),
            isLogged: () => of(true),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(CheckTokenGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
