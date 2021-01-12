import { TestBed } from '@angular/core/testing';
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './services/authentication/auth.service';

xdescribe('AppRoutingModule', () => {
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLogged: () => true,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should signin', (done) => {
    router.navigate(['/signin']).then(() => {
      expect(router.url).toBe('/signin');
      done();
    });
  });

  it('should signup', (done) => {
    router.navigate(['/signup']).then(() => {
      expect(router.url).toBe('/signup');
      done();
    });
  });

  it('should be itrations when path is empty when is logged', (done) => {
    router.navigate(['']).then(() => {
      expect(router.url).toBe('/dashboard');
      done();
    });
  });

  it('should be dashboard when is logged', (done) => {
    router.navigate(['dashboard']).then(() => {
      expect(router.url).toBe('/dashboard');
      done();
    });
  });

  it('should be iteration:id when is logged', (done) => {
    router.navigate(['iteration', 1]).then(() => {
      expect(router.url).toBe('/iteration/1');
      done();
    });
  });

  it('should be addIteration when is logged', (done) => {
    router.navigate(['addIteration']).then(() => {
      expect(router.url).toBe('/addIteration');
      done();
    });
  });

  it('should be dashboard when is not logged', (done) => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    router.navigate(['dashboard']).then(() => {
      expect(router.url).toBe('/signin');
      done();
    });
  });

  it('should be iteration:id when is not logged', (done) => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    router.navigate(['iteration', 1]).then(() => {
      expect(router.url).toBe('/signin');
      done();
    });
  });

  it('should be addIteration when is not logged', (done) => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    router.navigate(['addIteration']).then(() => {
      expect(router.url).toBe('/signin');
      done();
    });
  });

  it('should redirecto to signin when is not logged', (done) => {
    authService.isLogged = jasmine.createSpy().and.returnValue(false);
    router.navigate(['']).then(() => {
      expect(router.url).toBe('/signin');
      done();
    });
  });
});
