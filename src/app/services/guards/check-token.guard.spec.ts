import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
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
            renewToken: () => of(true),
            isLogged: () => true,
            logout: () => {},
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    authService = TestBed.inject(AuthService);
    guard = TestBed.inject(CheckTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should be logged', () => {
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should not be logged', () => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    expect(guard.canActivate()).toBeFalsy();
  });

  it('should token expired', () => {
    guard.expired = jasmine.createSpy().and.returnValue(true);
    expect(guard.canActivate()).toBeFalsy();
  });

  it('should not expired', () => {
    const dateNow = new Date();
    expect(guard.expired(dateNow.getTime())).toBeFalsy();
  });

  it('should expired', () => {
    const dateNow = new Date(-1);
    expect(guard.expired(dateNow.getTime())).toBeTruthy();
  });

  it('should renew', (done) => {
    const dateNow = new Date(-1);
    guard.checkRenew(dateNow.getTime()).then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should not be renewed', (done) => {
    const ahora = new Date();
    const dateNow = new Date(ahora.getTime() + 2 * 60 * 60 * 1000);
    guard.checkRenew(dateNow.getTime()).then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should have a exception', (done) => {
    const dateToken = new Date(-1);
    authService.renewToken = jasmine
      .createSpy()
      .and.returnValue(throwError(false));

    guard.checkRenew(dateToken.getTime()).then(
      () => {},
      (err) => {
        expect(err).toBeFalsy();
        done();
      }
    );
  });
});
