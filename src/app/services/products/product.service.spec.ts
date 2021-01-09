import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new ProductService(httpClientSpy as any, authClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
