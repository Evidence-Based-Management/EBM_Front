import { of, throwError } from 'rxjs';

import { TeamsService } from './teams.service';
import { Team } from '../../Interfaces/team';

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

  it('shoult get a value when call getTeamsByUserId', (done) => {
    httpClientSpy.get.and.returnValue(of(true));
    service.getTeamsByUserId().subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should to provoke an error - getIterationsByPoduct(-1)', () => {
    httpClientSpy.get.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.getTeamsByUserId().subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterationsByPoduct(-1) - instanceof ErrorEvent', () => {
    const errorEventFake = {
      error: new ErrorEvent('my type', {
        message: 'Error Code: 404\nMessage: Not found',
      }),
    };

    httpClientSpy.get.and.returnValue(throwError(errorEventFake));

    service.getTeamsByUserId().subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('shoult save a value when call save', (done) => {
    const team: Team = null;
    httpClientSpy.post.and.returnValue(of(true));
    service.save(team).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
