import { TestBed } from '@angular/core/testing';

import { SignInUserService } from './sign-in-user.service';

describe('SignInUserService', () => {
  let service: SignInUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignInUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});