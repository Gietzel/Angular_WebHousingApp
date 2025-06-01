import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HousingLocationComponent,
    MatIconModule
  ],
  template: `
    <section>
      <form class="search-form">
        <input
          class="text-filter"
          type="text"
          placeholder="Inicie sua busca"
          #filter
          list="cityList"
          [(ngModel)]="textFilter"
          [ngModelOptions]="{standalone: true}"
          (focus)="populateCityList()"
          (input)="filterResults()"
          
        />
        <datalist id="cityList">
          <option *ngFor="let city of cityList" [value]="city"></option>
        </datalist>

        <mat-date-range-input
          [formGroup]="dateRange"
          [rangePicker]="picker"
          class="hidden-input">
          <input matStartDate formControlName="start" />
          <input matEndDate formControlName="end" />
        </mat-date-range-input>

        <mat-date-range-picker #picker></mat-date-range-picker>

        <button
          mat-icon-button
          class="calendar-button"
          type="button"
          (click)="picker.open()">
          <mat-icon>calendar_today</mat-icon>
        </button>

        <button class="primary" type="button" (click)="filterResults()">
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
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  cityList: string[] = [];
  textFilter: string = '';

  housingService: HousingService = inject(HousingService);

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  ngOnInit(): void {
    this.dateRange.valueChanges.subscribe(range => {
      const start = range.start;
      const end = range.end;

      if (start && end) {
        this.filterResults(start, end);
      }
    });
  }

  populateCityList(): void {
    const cities = this.housingLocationList.map(location => location.city);
    this.cityList = Array.from(new Set(cities)).sort();
  }

  filterResults(start: Date | null = null, end: Date | null = null): void {
    this.isLoading = true;

    const text = this.textFilter.trim().toLowerCase();

    setTimeout(() => {
      this.filteredLocationList = this.housingLocationList.filter(location => {
        const matchesCity = !text || location.city.toLowerCase().includes(text);

        const availableFrom = new Date(location.availableFrom);
        const availableTo = new Date(location.availableTo);

        const matchesDate =
          (!start && !end) ||
          (start && end && availableFrom <= start && availableTo >= end);

        return matchesCity && matchesDate;
      });

      this.isLoading = false;
    }, 500);
  }

  onDateRangeChange() {
    const start = this.dateRange.get('start')?.value;
    const end = this.dateRange.get('end')?.value;

    if (start && end) {
      this.filterResults(start, end);
    }
  }
}