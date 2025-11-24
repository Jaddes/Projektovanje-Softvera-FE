import { TestBed } from '@angular/core/testing';

import { AnnualAwardsService } from './annual-awards.service';

describe('AnnualAwardsService', () => {
  let service: AnnualAwardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualAwardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
