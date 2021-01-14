import { TestBed } from '@angular/core/testing';

import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new TeamsService(httpClientSpy as any, authClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
