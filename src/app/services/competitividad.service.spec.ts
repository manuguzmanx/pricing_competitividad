import { TestBed } from '@angular/core/testing';

import { CompetitividadService } from './competitividad.service';

describe('CompetitividadService', () => {
  let service: CompetitividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
