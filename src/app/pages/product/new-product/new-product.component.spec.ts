import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductComponent } from './new-product.component';
import { ProductService } from 'src/app/services/products/product.service';
import { of } from 'rxjs';
import { TeamsService } from '../../../services/teams/teams.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let productService: ProductService;
  let teamService: TeamsService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProductComponent],
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
          provide: ProductService,
          useValue: {
            save: of(),
          },
        },
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
    fixture = TestBed.createComponent(NewProductComponent);
    productService = TestBed.inject(ProductService);
    teamService = TestBed.inject(TeamsService);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getTeamsByUserId', () => {
    const mockTeam = { id: '1', name: 'myteam' };
    teamService.getTeamsByUserId = jasmine
      .createSpy()
      .and.returnValue(of(mockTeam));
    component.getTeamsByUserId();
    expect(component.teamsSelect).toEqual(mockTeam);
  });

  it('should save a new product', () => {
    component.teamIdControl.setValue('anything');
    component.teamNameControl.setValue('anything');
    component.teamStarDateControl.setValue('anything');
    authService.id = 1;
    const mockTeam = { id: '1', name: 'myteam' };
    productService.save = jasmine.createSpy().and.returnValue(of(mockTeam));
    component.saveNewProduct();
    expect(component).toBeTruthy();
  });

  it('should save a new product', () => {
    const mockTeam = {};
    productService.save = jasmine.createSpy().and.returnValue(of(mockTeam));
    component.saveNewProduct();
    expect(component).toBeTruthy();
  });

  it('should not save a new product', () => {
    component.teamIdControl.setValue('anything');
    component.teamNameControl.setValue('anything');
    component.teamStarDateControl.setValue('anything');
    authService.id = 1;
    productService.save = jasmine.createSpy().and.returnValue(of(null));
    component.saveNewProduct();
    expect(component).toBeTruthy();
  });
});
