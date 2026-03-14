import { TestBed } from '@angular/core/testing';

import { SupabaseServiceTs } from '../../src/app/core/services/supabase.service.ts.js';

describe('SupabaseServiceTs', () => {
  let service: SupabaseServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
