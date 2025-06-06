import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesPopupComponent } from './preferences-popup.component';

describe('PreferencesPopupComponent', () => {
  let component: PreferencesPopupComponent;
  let fixture: ComponentFixture<PreferencesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferencesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
