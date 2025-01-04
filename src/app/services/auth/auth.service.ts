import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: environment.clientId,
  redirectUri: window.location.origin + '/auth/callback',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  scope: 'openid profile email',
  responseType: 'code',
  showDebugInformation: environment.showDebugInformation,
  strictDiscoveryDocumentValidation: false,
  disablePKCE: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;
  loginEvent = new EventEmitter<boolean>();

  constructor(
    private oAuthService: OAuthService,
    private http: HttpClient,
  ) {
    this.initConfiguration();
  }

  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.loadDiscoveryDocument();
  }

  login() {
    this.oAuthService.initCodeFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(concatMap(() => this.isAuthenticated()))
      .subscribe((isAuth) => this.loginEvent.emit(isAuth));
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

  getAuthorizationCode() {
    this.oAuthService.createAndSaveNonce;
    return this.oAuthService.getAccessToken();
  }

  sendAuthCodeToBackend(authCode: string) {
    const body = { code: authCode };
    this.http
      .post(`${this.apiUrl}/auth/google`, body, {
        withCredentials: true, // allows set a cookie
      })
      .pipe(concatMap(() => this.isAuthenticated()))
      .subscribe((isAuth) => this.loginEvent.emit(isAuth));
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<{ authenticated: boolean }>(`${this.apiUrl}/auth/verify`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.authenticated),
        catchError(() => of(false)),
      );
  }
}
