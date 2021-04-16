import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

import { NewTeamComponent } from './new-team.component';

describe('NewTeamComponent', () => {
  let component: NewTeamComponent;
  let fixture: ComponentFixture<NewTeamComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  let teamService: TeamsService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTeamComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
      ],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getTeamsByUserId: () => of(),
          },
        },

        {
          provide: AuthService,
          useValue: {
            getTeamsByUserId: of(),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamComponent);
    teamService = TestBed.inject(TeamsService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a new product', () => {
    component.teamNameControl.setValue('anything');
    component.teamStarDateControl.setValue('anything');
    authService.id = 1;
    const mockTeam = { id: '1', name: 'myteam' };
    teamService.save = jasmine.createSpy().and.returnValue(of(mockTeam));
    component.saveNewTeam();
    expect(component).toBeTruthy();
  });

  it('should save a new product', () => {
    const mockTeam = {};
    teamService.save = jasmine.createSpy().and.returnValue(of(mockTeam));
    component.saveNewTeam();
    expect(component).toBeTruthy();
  });

  it('should not save a new product', () => {
    component.teamNameControl.setValue('anything');
    component.teamStarDateControl.setValue('anything');
    authService.id = 1;
    teamService.save = jasmine.createSpy().and.returnValue(of(null));
    component.saveNewTeam();
    expect(component).toBeTruthy();
  });
});
