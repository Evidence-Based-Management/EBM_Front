import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { TeamsService } from '../../services/teams/teams.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let teamService: TeamsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamComponent],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
      ],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getTeamsByUserId: () =>
              of([
                {
                  id: 8,
                  name: 'Test_Postman',
                  dateJoin: '2021-04-16T22:05:25.585',
                  idUser: 1,
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should applyFilter', () => {
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
    });
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    inputElement.value = 12;
    inputElement.dispatchEvent(event);

    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('12');
  });

  it('should applyFilter else', () => {
    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
    });
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    inputElement.value = 12;
    inputElement.dispatchEvent(event);
    component.dataSource.paginator = null;

    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('12');
  });
});
