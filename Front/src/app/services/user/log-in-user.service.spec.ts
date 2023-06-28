import { TestBed } from '@angular/core/testing';

import { LogInUserService } from './log-in-user.service';

describe('LogInUserService', () => {
  let service: LogInUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
