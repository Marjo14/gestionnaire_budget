import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseTableComponent } from './income-expense-table.component';

describe('IncomeExpenseTableComponent', () => {
  let component: IncomeExpenseTableComponent;
  let fixture: ComponentFixture<IncomeExpenseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeExpenseTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeExpenseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
