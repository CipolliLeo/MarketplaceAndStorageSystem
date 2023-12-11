import { TestBed } from '@angular/core/testing';

import { EletronicService } from '../../services/eletronic.service';

describe('EletronicService', () => {
  let service: EletronicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EletronicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
