import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureOfDayComponent } from './picture-of-day.component';

describe('PictureOfDayComponent', () => {
  let component: PictureOfDayComponent;
  let fixture: ComponentFixture<PictureOfDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureOfDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
