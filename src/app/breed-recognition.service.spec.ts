import { TestBed } from '@angular/core/testing';

import { BreedRecognitionService } from './breed-recognition.service';

describe('BreedRecognitionService', () => {
  let service: BreedRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
