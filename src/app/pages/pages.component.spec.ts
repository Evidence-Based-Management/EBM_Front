import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';
import { AppPagesModule } from './pages.routes';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { User } from '../Interfaces/user';
import { of } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPagesModule, AppModule, SharedModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: (user: User) => of({}),
            isLogged: () => true,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Evidence-Based-Management'`, () => {
    expect(component.title).toEqual('Evidence Based Management');
  });

  it('should render router-outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should logout', () => {
    authService.logout = jasmine.createSpy().and.returnValue(null);
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
