import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Inicie sua busca"
          #filter
          list="cityList"
          (focus)="populateCityList()"
          (input)="filterResults(filter.value)"
        />
        <datalist id="cityList">
          <option *ngFor="let city of cityList" [value]="city"></option>
        </datalist>
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Buscar
        </button>
      </form>
    </section>
    <section class="results-container">
      <div *ngIf="isLoading" class="spinner-overlay">
        <div class="spinner"></div>
      </div>

      <section class="results" [class.blur]="isLoading">
        <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation">
        </app-housing-location>
      </section>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  isLoading: boolean = false;
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  cityList: string[] = [];

  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  populateCityList(): void {
    const cities = this.housingLocationList.map(location => location.city);
    this.cityList = Array.from(new Set(cities)).sort();
  }

  filterResults(text: string): void {
    this.isLoading = true;

    setTimeout(() => {
      if (!text) {
        this.filteredLocationList = this.housingLocationList;
      } else {
        this.filteredLocationList = this.housingLocationList.filter(
          housingLocation =>
            housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        );
      }
      this.isLoading = false;
    }, 1000);
  }
}