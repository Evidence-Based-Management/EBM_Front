import { TestBed } from '@angular/core/testing';
import { Router, CanActivate } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from '../authentication/auth.service';

import { SigInGuard } from './sig-in.guard';

describe('SigInGuard', () => {
  let guard: SigInGuard;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLogged: (user: User) => of({}),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(SigInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    expect(guard.canActivate()).toBeTruthy();
  });
});
