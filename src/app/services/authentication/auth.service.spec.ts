import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Interfaces/user';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let httpClientSpy: HttpClient;
  const user: User = { username: 'test', password: 'my pass' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        {
          provide: HttpClient,
          useValue: {
            post: () => of({}),
            put: () => of({}),
          },
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient);

    spyOn(httpClientSpy, 'post').and.returnValue(of(user));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.loadLocalStorage.call.length).toBe(1);
    expect(service.user).toBeNull();
    expect(service.token).toBeNull();
  });

  it('should signup', (done) => {
    service.signup(user).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should not signup', (done) => {
    httpClientSpy.post = jasmine.createSpy().and.returnValue(
      of({
        userName: 'diff',
      })
    );
    service.signup(user).subscribe((result) => {
      expect(result).toBeFalsy();
      done();
    });
  });

  it('should signin', (done) => {
    httpClientSpy.post = jasmine.createSpy().and.returnValue(
      of({
        id: 1,
        userName: 'test',
        jwt: 'Bearer safasdfsdfsdfsdfdsf-sdfsdf,..dsfsdf',
      })
    );
    service.signin(user).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(service.saveLocaStorage.call.length).toBe(1);
      expect(service.user).toBe('test');
      expect(service.token).toBe('Bearer safasdfsdfsdfsdfdsf-sdfsdf,..dsfsdf');
      service.loadLocalStorage();
      expect(service.user).toBe('test');
      expect(service.token).toBe('Bearer safasdfsdfsdfsdfdsf-sdfsdf,..dsfsdf');
      service.logout();
      done();
    });
  });

  it('should isLogged', () => {
    expect(service.isLogged()).toBeFalsy();
  });

  it('should is not Logged', () => {
    service.token = 'Bearer aslkjdjkhasdjkasjkdas.asdkjaskjdhjskajd-jkadjhkasd';
    expect(service.isLogged()).toBeTruthy();
  });

  it('should is not Logged - toker < 5 ', () => {
    service.token = 'Beare';
    expect(service.isLogged()).toBeFalsy();
  });

  it('should to provoke an error - getIterations', (done) => {
    httpClientSpy.post = jasmine
      .createSpy()
      .and.returnValue(throwError({ status: 404, message: 'Not found' }));

    service.signup(user).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
        done();
      }
    );
    expect(httpClientSpy.post.call.length).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterationById(-1) - instanceof ErrorEvent', () => {
    const errorEventFake = {
      error: new ErrorEvent('my type', {
        message: 'Error Code: 404\nMessage: Not found',
      }),
    };

    httpClientSpy.post = jasmine
      .createSpy()
      .and.returnValue(throwError(errorEventFake));

    service.signup(user).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.post.call.length).toBe(1, 'one call');
  });

  it('should checkusername', (done) => {
    httpClientSpy.get = jasmine.createSpy().and.returnValue(of(user));
    service.checkUserName(user.username).subscribe((result) => {
      expect(result).toBe(user);
      done();
    });
  });

  it('should renewToken', (done) => {
    const mockResponse = { jwt: 'test' };
    httpClientSpy.get = jasmine.createSpy().and.returnValue(of(mockResponse));
    service.renewToken().subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should have an error renewToken', (done) => {
    httpClientSpy.get = jasmine.createSpy().and.returnValue(throwError(false));
    service.renewToken().subscribe(
      (result) => {},
      (err) => {
        expect(err).toBeFalsy();
        done();
      }
    );
  });
});
