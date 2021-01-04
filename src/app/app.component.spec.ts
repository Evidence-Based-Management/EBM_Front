import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/home/loader/loader.component';
import { SidenavComponent } from './shared/home/sidenav/sidenav.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AppComponent, SidenavComponent, LoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should render app-loader', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('app-loader')).not.toBeNull();
  });
});
