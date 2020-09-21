import { TestBed } from '@angular/core/testing';

import { TestHeaderService } from './test-header.service';

describe('TestHeaderService', () => {
  let service: TestHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
