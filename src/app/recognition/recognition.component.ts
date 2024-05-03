import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  standalone: true,
  imports: [HttpClientModule, FileUploadModule, ImageModule, CommonModule],
})
export class RecognitionComponent {
  uploadedFiles: any[] = [];
  imageUrl: string | undefined = undefined;
  breed: string = '';

  constructor(private http: HttpClient) {}

  onUpload(event: any) {
    this.imageUrl = event.files[0].objectURL;
    this.breed = event.originalEvent.body.breed;
  }
}
