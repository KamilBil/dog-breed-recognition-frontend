import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { CameraComponent } from '../camera/camera.component';
import { WebcamImage } from 'ngx-webcam';
import { BreedRecognitionService } from '../services/breed-recognition/breed-recognition.service';
import { WikipediaService } from '../services/wikipedia/wikipedia.service';

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
    CameraComponent,
  ],
})
export class RecognitionComponent {
  uploadedFiles: any[] = [];
  imageUrl: string | undefined = undefined;
  breed: string = '';
  wikiInfo: string = '';
  cameraPreview = false;

  constructor(
    private wikipediaService: WikipediaService,
    private breedRecognitionService: BreedRecognitionService
  ) {}

  openCameraPreview(event: any) {
    this.cameraPreview = !this.cameraPreview;
  }

  srcToFile(src: string, fileName: string, mimeType: string) {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], fileName, { type: mimeType });
      });
  }

  madePhoto(img: WebcamImage) {
    this.srcToFile(img.imageAsDataUrl, 'hello.txt', 'text/plain').then(
      (file) => {
        this.cameraPreview = false;
        this.imageUrl = img.imageAsDataUrl;
        this.sendRecognitionRequest(file);
      }
    );
  }

  sendRecognitionRequest(img: File) {
    this.breedRecognitionService.recognise_breed(img).subscribe((data: any) => {
      this.breed = data.breed;
      this.getWikiInfo(this.breed);
    });
  }

  getWikiInfo(breed: string) {
    this.wikipediaService.search(this.breed).subscribe((data) => {
      if (data.length > 0) {
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

  onUpload(event: any) {
    const file = event.files[0];
    this.sendRecognitionRequest(file);
    this.imageUrl = file.objectURL;
    this.breed = event.originalEvent.body.breed;
    this.getWikiInfo(this.breed);
  }
}
