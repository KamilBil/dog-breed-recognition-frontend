import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { BreedRecognitionService } from '../services/breed-recognition/breed-recognition.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.scss',
})
export class BreedsComponent implements OnInit {
  public tableData: string[] = [];
  public filteredBreeds: string[] = [];

  constructor(private breedRecognitionService: BreedRecognitionService) {}

  ngOnInit(): void {
    this.breedRecognitionService.breeds_list().subscribe((response) => {
      this.tableData = response.breeds;
      this.filteredBreeds = this.tableData;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredBreeds = this.tableData.filter((breed) =>
      breed.toLowerCase().includes(filterValue)
    );
  }
}
