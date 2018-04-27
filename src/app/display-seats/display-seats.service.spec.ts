import { TestBed, inject } from '@angular/core/testing';

import { DisplaySeatsService } from './display-seats.service';

describe('DisplaySeatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplaySeatsService]
    });
  });

  it('should be created', inject([DisplaySeatsService], (service: DisplaySeatsService) => {
    expect(service).toBeTruthy();
  }));
});
