import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface WikipediaResponse {
  query: Query;
}

interface Query {
  pages: { [key: string]: SearchResult };
}

export interface SearchResult {
  pageid: number;
  title: string;
  extract: string;
}

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private apiUrl = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchResult[]> {
    const params = {
      action: 'query',
      format: 'json',
      generator: 'search',
      gsrsearch: term,
      prop: 'extracts',
      exchars: 500,
      exintro: true,
      explaintext: true,
      origin: '*',
    };

    return this.http
      .get<WikipediaResponse>(this.apiUrl, { params })
      .pipe(map((response) => {
        const pages = response.query.pages;
        return Object.keys(pages).map(key => pages[key]);
      }));
  }
}
