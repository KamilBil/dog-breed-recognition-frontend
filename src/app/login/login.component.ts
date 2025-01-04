import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreedRecognitionService } from '../services/breed-recognition/breed-recognition.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  profile: any;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private breedRecognitionService: BreedRecognitionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const authCode = params['code'];
      if (authCode) {
        this.authService.sendAuthCodeToBackend(authCode);
        this.router.navigate(['/']);
      }
    });

    this.showData();
  }

  showData() {
    this.profile = this.authService.getProfile()['name'];
    if (this.profile) {
      const token = this.authService.getAuthorizationCode();
      this.breedRecognitionService.auth_google(token).subscribe();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
