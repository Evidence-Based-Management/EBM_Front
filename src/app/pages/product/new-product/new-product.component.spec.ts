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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProductComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
