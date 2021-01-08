import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/services/authentication/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let authService: AuthService;

  let user: User = {
    username: null,
    password: null,
    confirm_password: null,
    email: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: (user: User) =>
              of({
                username: 'myusername',
                password: 'mypass',
                confirm_password: 'mypass',
                email: 'mywmail@gmail.com',
              }),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    authService = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(user);
  });

  it('should validate an email empty or null', () => {
    component.user.username = 'myuser';
    component.checkEmpty();
    expect(component.validationEmptyEmail).toBeTruthy();
  });

  it('should validate password empty or null', () => {
    component.user.username = 'myuser';
    component.user.email = 'myuser';
    component.checkEmpty();
    expect(component.validationEmptyPassword).toBeTruthy();
  });

  it('should validate confirm password empty or null', () => {
    component.user.username = 'myuser';
    component.user.email = 'myuser';
    component.user.password = 'myuser';
    component.checkEmpty();
    expect(component.validationEmptyConfirmPassword).toBeTruthy();
  });

  it('should a valid signup', () => {
    component.user = {
      username: 'myusername',
      password: 'mypass',
      confirm_password: 'mypass',
      email: 'mywmail@gmail.com',
    };
    component.validationPassword = false;

    authService.signup = jasmine.createSpy().and.returnValue(of(true));
    component.signup();
    expect(component.user.idRol).toEqual(2);
    expect(component.user.confirm_password).toBeUndefined();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
  });

  it('should a invalid signup - empty problem', () => {
    component.signup();
    expect(component.user.idRol).toBeUndefined();
  });

  it('should a invalid signup - password problem', () => {
    component.user = {
      username: 'myusername',
      password: 'mypass',
      confirm_password: 'mypass',
      email: 'mywmail@gmail.com',
    };
    component.validationPassword = true;

    component.signup();
    expect(component.user.idRol).toBeUndefined();
  });

  it('should a invalid signup - request problem', () => {
    component.user = {
      username: 'myusername',
      password: 'mypass',
      confirm_password: 'mypass',
      email: 'mywmail@gmail.com',
    };
    authService.signup = jasmine.createSpy().and.returnValue(of(false));

    component.validationPassword = false;

    component.signup();
    expect(component.user.idRol).toBe(2);
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });

  it('should checkPasswords', () => {
    component.user = {
      username: 'myusername',
      password: 'mypass',
      confirm_password: 'mypass',
      email: 'mywmail@gmail.com',
    };
    component.checkPasswords();

    expect(component.validationPassword).toBeFalsy();
  });

  it('should checkPasswords does not same', () => {
    component.user = {
      username: 'myusername',
      password: 'mypass',
      confirm_password: 'mypasssadasdasd',
      email: 'mywmail@gmail.com',
    };
    component.checkPasswords();

    expect(component.validationPassword).toBeTruthy();
  });

  it('should checkUserName a valid username', () => {
    authService.checkUserName = jasmine.createSpy().and.returnValue(of(true));
    component.checkUserName();
    expect(component.validationUserName).toBeFalsy();
  });

  it('should checkUserName a invalid username', () => {
    authService.checkUserName = jasmine.createSpy().and.returnValue(of(false));
    component.checkUserName();
    expect(component.validationUserName).toBeTruthy();
  });
});
