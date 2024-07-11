import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreedRecognitionService {
  private url =
    'https://dog-breed-recognition-backend.kamilbil.pl/breed-detection';

  constructor(private http: HttpClient) {}

  recognise_breed(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', img, img.name);
    return this.http.post(this.url, formData);
  }
}
