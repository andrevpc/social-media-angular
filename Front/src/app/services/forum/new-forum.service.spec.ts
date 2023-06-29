import { TestBed } from '@angular/core/testing';

import { NewForumService } from './new-forum.service';

describe('NewForumService', () => {
  let service: NewForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
