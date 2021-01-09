import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { LoaderState } from '../../Interfaces/loader';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service.loaderState).toEqual(
      new Subject<LoaderState>().asObservable()
    );
    expect(service).toBeTruthy();
  });

  it('should has a show:true propertie when show() is called', (done) => {
    service.loaderState.subscribe((state: LoaderState) => {
      expect(state.show).toBeTruthy();
      done();
    });

    service.show();
  });

  it('should has a show:false propertie when show() is called', (done) => {
    service.loaderState.subscribe((state: LoaderState) => {
      expect(state.show).toBeFalsy();
      done();
    });

    service.hide();
  });
});
