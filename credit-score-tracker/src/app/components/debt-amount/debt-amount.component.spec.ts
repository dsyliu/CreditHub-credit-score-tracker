import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtAmountComponent } from './debt-amount.component';

describe('DebtAmountComponent', () => {
  let component: DebtAmountComponent;
  let fixture: ComponentFixture<DebtAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
