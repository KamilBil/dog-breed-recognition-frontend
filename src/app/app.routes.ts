import { Routes } from '@angular/router';
import { RecognitionComponent } from './recognition/recognition.component';
import { HomeComponent } from './home/home.component';
import { BreedsComponent } from './breeds/breeds.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recognition', component: RecognitionComponent },
  { path: 'breeds', component: BreedsComponent },
];
