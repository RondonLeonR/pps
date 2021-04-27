import { TestBed } from '@angular/core/testing';

import { MensajeErrorService } from './mensaje-error.service';

describe('MensajeErrorService', () => {
  let service: MensajeErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
