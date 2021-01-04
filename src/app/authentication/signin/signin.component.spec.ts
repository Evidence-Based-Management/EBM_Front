import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SigninComponent } from './signin.component';
import { AuthService } from '../../services/authentication/auth.service';
import { User } from '../../Interfaces/user';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: (user: User) => of({}),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signin', () => {
    authService.signin = jasmine.createSpy().and.returnValue(of(true));
    component.signin();
    expect(component.router.navigate.call.length).toBe(1);
    expect(component.errorMessage).toBeUndefined();
  });

  it('should signin false', () => {
    authService.signin = jasmine.createSpy().and.returnValue(of(false));
    component.signin();
    expect(component.errorMessage).toBe('User or password was incorrect!');
  });
});
