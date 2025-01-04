import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BreedRecognitionService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  recognise_breed(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', img, img.name);
    return this.http.post(this.url + '/breed-detection', formData);
  }

  breeds_list(): Observable<any> {
    return this.http.get(this.url + '/breeds');
  }

  dog_image(breedName: string): Observable<any> {
    return this.http.get(this.url + '/image', {
      params: { breed_name: breedName },
      responseType: 'blob',
    });
  }

  auth_google(code: string): Observable<any> {
    return this.http.get(this.url + '/auth/google', {
      params: { code: code },
    });
  }
}
