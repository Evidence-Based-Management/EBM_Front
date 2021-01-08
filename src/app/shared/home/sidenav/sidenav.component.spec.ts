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
    expect(result[1].nativeElement.innerHTML).toBe('Iterations');
    expect(result[2].nativeElement.innerHTML).toBe('Products');
    expect(result[3].nativeElement.innerHTML).toBe('Teams');
  });

  it('should have the arribute routerLink /dashboard and /iterations', () => {
    const result = fixture.debugElement.queryAll(By.css('a'));

    expect(result[1].attributes.routerLink).toBe('/dashboard');
    expect(result[2].attributes.routerLink).toBe('/iterations');
    expect(result[3].attributes.routerLink).toBe('/products');
    expect(result[4].attributes.routerLink).toBe('/teams');
  });
});
