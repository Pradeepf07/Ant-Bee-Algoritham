import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomescreenComponent } from './welcomescreen.component';

describe('WelcomescreenComponent', () => {
  let component: WelcomescreenComponent;
  let fixture: ComponentFixture<WelcomescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
