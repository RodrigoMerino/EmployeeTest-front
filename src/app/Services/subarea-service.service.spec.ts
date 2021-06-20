import { TestBed } from '@angular/core/testing';

import { SubareaServiceService } from './subarea-service.service';

describe('SubareaServiceService', () => {
  let service: SubareaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubareaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
