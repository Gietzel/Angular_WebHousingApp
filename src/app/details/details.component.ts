import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
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

        <section class="listing-reservation">
          <button class="primary large" (click)="makeReservation()">
            Fazer Reserva
          </button>

          <div class="or-divider">ou</div>

          <div class="proposal-section">
            <label for="propose-value" class="proposal-label">ENVIAR UMA PROPOSTA</label>
            <div class="input-with-tooltip">
                <input
                  id="propose-value"
                  type="text"
                  [value]="formattedProposal"
                  (input)="onProposalInput($event)"
                  placeholder="Digite sua proposta"
                  required
                />
              <div *ngIf="showTooltip" class="tooltip">
                Valor muito baixo! Deve ser pelo menos 70% do valor original.
              </div>
            </div>

            <button
              class="secondary"
              [disabled]="showTooltip || !proposalValue"
              (click)="submitProposal()"
            >
              Enviar Proposta
            </button>
          </div>

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

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  `,
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation?: HousingLocation;
  formattedProposal = '';
  totalPrice = 0;
  proposalValue: number | null = null;
  showTooltip = false;
  rawProposalDigits: string = '';
  stayValue: number = 1;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(id);

    const stay = this.route.snapshot.queryParamMap.get('stay');
    this.stayValue = stay ? Math.max(1, parseInt(stay, 10)) : 1;
  }

  submitApplication() {
    if (this.applyForm.valid) {
      const { firstName, lastName, email } = this.applyForm.value;
      this.housingService.submitApplication(firstName!, lastName!, email!);
      this.applyForm.reset();
    }
  }

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
      default:                 return 'check_circle'; 
    }
  }

  getNumDays(): number {
    return this.stayValue;
  }

  getBaseCost(): number {
    if (!this.housingLocation) return 0;
    return this.getNumDays() * this.housingLocation.price;
  }

  getPlatformFee(): number {
    return this.getBaseCost() * 0.10;
  }

  getTotalCost(): number {
    this.totalPrice = this.getBaseCost() + this.getPlatformFee();

    return this.totalPrice;
  }

  makeReservation() {
    Swal.fire({
      title: 'Reserva realizada com sucesso!',
      position: 'bottom-end',
      background: '#f3e8ff',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-popup'
      }
    });
  }

  makeProposal() {
    Swal.fire({
      title: `Proposta de R$${this.proposalValue} enviada ao proprietário!`,
      position: 'bottom-end',
      background: '#f3e8ff',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-popup'
      }
    });
  }

  onProposalInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputEvent = event as InputEvent;

    if (inputEvent.inputType === 'deleteContentBackward') {
      this.rawProposalDigits = this.rawProposalDigits.slice(0, -1);
    } else if (inputEvent.data && /\d/.test(inputEvent.data)) {
      this.rawProposalDigits += inputEvent.data;
    } else {
      input.value = this.formattedProposal;
      return;
    }

    const padded = this.rawProposalDigits.padStart(3, '0');
    const floatString = padded.slice(0, -2) + '.' + padded.slice(-2);
    const numeric = parseFloat(floatString) || 0;

    this.proposalValue = numeric;
    this.formattedProposal = this.maskCurrencyString(numeric);
    input.value = this.formattedProposal;
    this.validateProposal();
  }

  onProposalBlur(): void {
    this.validateProposal();
  }

  maskCurrencyString(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  validateProposal(): void {
    if (this.proposalValue !== null) {
      const minimumAllowed = this.totalPrice * 0.7;
      this.showTooltip = this.proposalValue < minimumAllowed;
    } else {
      this.showTooltip = false;
    }
  }

  submitProposal(): void {
    if (this.showTooltip || this.proposalValue === null) {
      return;
    }

    this.makeProposal()

    this.rawProposalDigits = '';
    this.proposalValue = null;
    this.formattedProposal = '';
  }
}