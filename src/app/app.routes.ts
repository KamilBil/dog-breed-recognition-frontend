import { Routes } from '@angular/router';
import { RecognitionComponent } from './recognition/recognition.component';
import { HomeComponent } from './home/home.component';
import { BreedsComponent } from './breeds/breeds.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recognition', component: RecognitionComponent },
  { path: 'breeds', component: BreedsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'auth/callback', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
];
