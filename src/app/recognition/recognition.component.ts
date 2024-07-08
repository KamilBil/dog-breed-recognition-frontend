import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { WikipediaService } from '../wikipedia.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    FileUploadModule,
    ImageModule,
    CommonModule,
    CardModule,
  ],
})
export class RecognitionComponent {
  uploadedFiles: any[] = [];
  imageUrl: string | undefined = undefined;
  breed: string = '';
  wikiInfo: string = '';

  constructor(
    private http: HttpClient,
    private wikipediaService: WikipediaService
  ) {}

  onUpload(event: any) {
    this.imageUrl = event.files[0].objectURL;
    this.breed = event.originalEvent.body.breed;
    this.wikipediaService.search(this.breed).subscribe((data) => {
      if (data.length > 0) {
        console.log(data);
        for (const element of data) {
          if (
            element.extract.includes('dog') &&
            element.extract.includes('breed')
          ) {
            this.wikiInfo = element.extract;
            break;
          }
        }
      }
    });
  }
}
