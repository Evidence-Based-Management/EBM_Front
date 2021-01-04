import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let httpClientSpy: { put: jasmine.Spy; post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
