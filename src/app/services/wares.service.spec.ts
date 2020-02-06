import { TestBed } from '@angular/core/testing';

import { WaresService } from './wares.service';

describe('WaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaresService = TestBed.get(WaresService);
    expect(service).toBeTruthy();
  });
});
