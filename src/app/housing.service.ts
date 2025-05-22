import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  protected housingLocationList: HousingLocation[] = [
  {
    id: 0,
    name: 'Casa Moderna com Piscina',
    city: 'Ibiúna',
    state: 'SP',
    photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
    price: 350,
    kitchen: 1,
    bedroom: 3,
    bathroom: 2,
    wifi: true,
    laundry: true
  },
  {
    id: 1,
    name: 'Apartamento Espaço para Família',
    city: 'São Roque',
    state: 'SP',
    photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
    price: 500,
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true
  },
  {
    id: 2,
    name: 'Casa Aconchegante no Centro',
    city: 'São Roque',
    state: 'SP',
    photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
    price: 200,
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: true,
    laundry: false
  },
  {
    id: 3,
    name: 'Casa Simples com Quintal',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
    price: 180,
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: false,
    laundry: true
  },
  {
    id: 4,
    name: 'Residência Luxuosa com Área Gourmet',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
    price: 600,
    kitchen: 1,
    bedroom: 5,
    bathroom: 4,
    wifi: true,
    laundry: true
  },
  {
    id: 5,
    name: 'Sobrado Espaçoso com Jardim',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
    price: 400,
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true
  },
  {
    id: 6,
    name: 'Casa Rústica com Varanda',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
    price: 250,
    kitchen: 1,
    bedroom: 3,
    bathroom: 2,
    wifi: false,
    laundry: false
  },
  {
    id: 7,
    name: 'Casarão Condomínio Fechado',
    city: 'Campinas',
    state: 'SP',
    photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
    price: 220,
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: true,
    laundry: true
  },
  {
    id: 8,
    name: 'Apartamento Moderno Próximo à USP',
    city: 'Campinas',
    state: 'SP',
    photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
    price: 550,
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true
  }
];

getAllHousingLocations(): HousingLocation[] {
  return this.housingLocationList;
}

getHousingLocationById(id: number): HousingLocation | undefined {
  return this.housingLocationList.find(housingLocation => housingLocation.id === id);
}

submitApplication(firstName: string, lastName: string, email: string) {
  console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
}
}
