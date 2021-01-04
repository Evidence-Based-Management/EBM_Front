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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            sigin: (user: User) => of({}),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
