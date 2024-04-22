import { TestBed } from '@angular/core/testing';

import { PictureOfDayService } from './picture-of-day.service';

describe('PictureOfDayService', () => {
  let service: PictureOfDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureOfDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
