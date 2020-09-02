import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaySettingsComponent } from './clay-settings.component';

describe('ClaySettingsComponent', () => {
  let component: ClaySettingsComponent;
  let fixture: ComponentFixture<ClaySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
