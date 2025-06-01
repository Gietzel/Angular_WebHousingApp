// details.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  template: `
    <article class="details-article">
      <div class="form-content">
        <section class="listing-description">
          <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
          <p class="listing-location">
            {{ housingLocation?.city }}, {{ housingLocation?.state }}
          </p>
          <p class="listing-short-desc">{{ housingLocation?.description }}</p>
        </section>

        <section class="listing-features" *ngIf="housingLocation">
        <br>
          <div *ngIf="housingLocation.amenities?.length; else noAmenities">
            <h3 >Comodidades:</h3>
            <ul class="amenities-list">
              <li *ngFor="let amenity of housingLocation.amenities" class="amenity-item">
                <mat-icon class="amenity-icon">{{ getIconName(amenity) }}</mat-icon>
                <span class="amenity-label">{{ amenity }}</span>
              </li>
            </ul>
          </div>
          <ng-template #noAmenities>
            <p>No amenities listed for this location.</p>
          </ng-template>

          <div class="bool-features">
            <p>
              <mat-icon>{{ housingLocation.wifi ? 'wifi' : 'wifi_off' }}</mat-icon>
              Wi-Fi: {{ housingLocation.wifi ? 'Disponível' : 'Indisponível' }}
            </p>
            <p>
              <mat-icon>{{ housingLocation.laundry ? 'local_laundry_service' : 'washing_machine' }}</mat-icon>
              Lavanderia: {{ housingLocation.laundry ? 'Disponível' : 'Indisponível' }}
            </p>
          </div>

          <div *ngIf="getNumDays() > 0" class="cost-section">
            <h3 class="section-heading">Valor Estadia</h3>
            <p>
              {{ getNumDays() }} dia{{ getNumDays() > 1 ? 's' : '' }}
              &times; {{ housingLocation.price | currency:'BRL':'symbol':'1.0-0' }}
              &nbsp;=&nbsp;{{ getBaseCost() | currency:'BRL':'symbol':'1.0-0' }}
            </p>
            <p>
              Taxa da plataforma (10%): {{ getPlatformFee() | currency:'BRL':'symbol':'1.0-0' }}
            </p>
            <h3 class="total-cost">
              Total: {{ getTotalCost() | currency:'BRL':'symbol':'1.0-0' }}
            </h3>
          </div>
        </section>

        <section class="listing-apply">
          <h2 class="section-heading">Apply now to live here</h2>
          <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input id="first-name" type="text" formControlName="firstName" required />

            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" formControlName="lastName" required />

            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" required />

            <button type="submit" class="primary">Apply now</button>
          </form>
        </section>
      </div>

      <div class="photo-container">
        <img
          class="listing-photo"
          [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
        />
      </div>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation?: HousingLocation;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(id);
  }

  // Submit application (no change)
  submitApplication() {
    if (this.applyForm.valid) {
      const { firstName, lastName, email } = this.applyForm.value;
      this.housingService.submitApplication(firstName!, lastName!, email!);
      // Optionally reset form or show a success message
      this.applyForm.reset();
    }
  }

  // Map amenity names to Material icon names
  getIconName(amenity: string): string {
    switch (amenity.toLowerCase()) {
      case 'piscina':          return 'pool';
      case 'churrasqueira':    return 'outdoor_grill';
      case 'estacionamento':   return 'local_parking';
      case 'ar condicionado':  return 'ac_unit';
      case 'garagem':          return 'garage';
      case 'quintal':          return 'grass';
      case 'vaga de garagem':  return 'local_parking';
      case 'área gourmet':     return 'restaurant';
      case 'academia':         return 'fitness_center';
      case 'jardim':           return 'park';
      case 'varanda':          return 'deck';
      case 'portaria 24h':     return 'security';
      case 'coworking':        return 'business_center';
      default:                 return 'check_circle';  // fallback icon
    }
  }

  // Calculate number of days between availableFrom and availableTo
  getNumDays(): number {
    if (!this.housingLocation?.availableFrom || !this.housingLocation?.availableTo) {
      return 0;
    }
    const start = new Date(this.housingLocation.availableFrom);
    const end = new Date(this.housingLocation.availableTo);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = Math.abs(end.getTime() - start.getTime());
    return Math.max(1, Math.floor(diffMs / msPerDay)); // at least 1 day
  }

  // Base cost without platform fee
  getBaseCost(): number {
    if (!this.housingLocation) return 0;
    return this.getNumDays() * this.housingLocation.price;
  }

  // Platform fee (10% of base cost)
  getPlatformFee(): number {
    return this.getBaseCost() * 0.10;
  }

  // Total cost including platform fee
  getTotalCost(): number {
    return this.getBaseCost() + this.getPlatformFee();
  }
}