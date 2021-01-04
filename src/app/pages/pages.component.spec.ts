import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from '../shared/home/loader/loader.component';
import { SidenavComponent } from '../shared/home/sidenav/sidenav.component';

import { PagesComponent } from './pages.component';
import { AppPagesModule } from './pages.routes';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPagesModule, AppModule, SharedModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Evidence-Based-Management'`, () => {
    expect(component.title).toEqual('Evidence Based Management');
  });

  it('should render router-outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

});
