import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

import { SignInGuard } from './sign-in.guard';

describe('SigInGuard', () => {
  let guard: SignInGuard;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLogged: () => true,
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    guard = TestBed.inject(SignInGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should return false', () => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    expect(guard.canActivate()).toBeFalsy();
  });
});
