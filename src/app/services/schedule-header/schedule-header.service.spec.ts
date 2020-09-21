import { TestBed } from '@angular/core/testing';

import { ScheduleHeaderService } from './schedule-header.service';

describe('ScheduleHeaderService', () => {
  let service: ScheduleHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
