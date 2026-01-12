import { TestBed } from '@angular/core/testing';

import { SocketSupplyService } from './socket-supply.service';

describe('SocketSupplyService', () => {
  let service: SocketSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
