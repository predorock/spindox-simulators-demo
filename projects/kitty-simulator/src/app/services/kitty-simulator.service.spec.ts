import { TestBed } from '@angular/core/testing';

import { KittySimulatorService } from './kitty-simulator.service';

describe('KittySimulatorService', () => {
  let service: KittySimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KittySimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
