import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Dashboard and Manage Iterations links', () => {
    const result = fixture.debugElement.queryAll(By.css('span'));

    expect(result[0].nativeElement.innerHTML).toBe('Dashboard');
    expect(result[1].nativeElement.innerHTML).toBe('Manage Iterations');
  });

  it('should have the arribute routerLink /dashboard and /iterations', () => {
    const result = fixture.debugElement.queryAll(By.css('.nav-link'));

    expect(result[0].attributes.routerLink).toBe('/dashboard');
    expect(result[1].attributes.routerLink).toBe('/iterations');
  });
});
