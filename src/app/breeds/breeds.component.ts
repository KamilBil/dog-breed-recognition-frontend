import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { BreedRecognitionService } from '../services/breed-recognition/breed-recognition.service';
import { InputTextModule } from 'primeng/inputtext';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface BreedRow {
  name: string;
  img: SafeUrl | null;
}

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss',
})
export class BreedsComponent implements OnInit {
  public tableData: BreedRow[] = [];
  public filteredBreeds: BreedRow[] = [];
  constructor(
    private breedRecognitionService: BreedRecognitionService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.breedRecognitionService.breeds_list().subscribe((response) => {
      const breedsList = response.breeds;
      this.tableData = breedsList.map((x: string) => {
        return {
          name: x.replaceAll('_', ' '),
          img: null,
        };
      });
      this.filteredBreeds = this.tableData;

      for (let i = 0; i < this.tableData.length; i++) {
        this.breedRecognitionService
          .dog_image(this.tableData[i].name)
          .subscribe((blob) => {
            const url = URL.createObjectURL(blob);
            this.tableData[i].img = this.sanitizer.bypassSecurityTrustUrl(url);
          });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBreeds = this.tableData.filter((breed) =>
      breed.name.toLowerCase().includes(filterValue),
    );
  }
}
