import { ComponentFixture, TestBed } from '@angular/core/testing';

import { loadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingBarComponent', () => {
  let component: loadingSpinnerComponent;
  let fixture: ComponentFixture<loadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [loadingSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(loadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
