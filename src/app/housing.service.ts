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
    description: 'Casa moderna equipada com piscina, perfeita para finais de semana e lazer em família.',
    city: 'Ibiúna',
    state: 'SP',
    photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
    price: 350,
    amenities: ['Piscina', 'Churrasqueira', 'Estacionamento'],
    kitchen: 1,
    bedroom: 3,
    bathroom: 2,
    wifi: true,
    laundry: true,
    availableFrom: '2025-05-01',
    availableTo: '2025-12-31',
    rating: 4.5
  },
  {
    id: 1,
    name: 'Apartamento Espaço para Família',
    description: 'Amplo apartamento ideal para famílias, com fácil acesso a comércios e pontos turísticos.',
    city: 'São Roque',
    state: 'SP',
    photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
    price: 500,
    amenities: ['Garagem', 'Varanda', 'Área Gourmet'],
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true,
    availableFrom: '2025-06-01',
    availableTo: '2025-12-15',
    rating: 4.7
  },
  {
    id: 2,
    name: 'Casa Aconchegante no Centro',
    description: 'Casa charmosa e aconchegante no centro, próxima a tudo.',
    city: 'São Roque',
    state: 'SP',
    photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
    price: 200,
    amenities: ['Ar Condicionado', 'Garagem'],
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: true,
    laundry: false,
    availableFrom: '2025-05-15',
    availableTo: '2025-11-30',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Casa Simples com Quintal',
    description: 'Casa simples, aconchegante e com um ótimo quintal para pets.',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
    price: 180,
    amenities: ['Quintal', 'Vaga de Garagem'],
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: false,
    laundry: true,
    availableFrom: '2025-07-01',
    availableTo: '2025-12-31',
    rating: 3.8
  },
  {
    id: 4,
    name: 'Residência Luxuosa com Área Gourmet',
    description: 'Residência de alto padrão com ampla área gourmet e espaço para eventos.',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
    price: 600,
    amenities: ['Piscina', 'Área Gourmet', 'Estacionamento', 'Academia'],
    kitchen: 1,
    bedroom: 5,
    bathroom: 4,
    wifi: true,
    laundry: true,
    availableFrom: '2025-05-01',
    availableTo: '2025-12-31',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Sobrado Espaçoso com Jardim',
    description: 'Sobrado espaçoso com um belo jardim e ambientes bem iluminados.',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
    price: 400,
    amenities: ['Jardim', 'Churrasqueira', 'Varanda'],
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true,
    availableFrom: '2025-06-01',
    availableTo: '2025-12-31',
    rating: 4.6
  },
  {
    id: 6,
    name: 'Casa Rústica com Varanda',
    description: 'Casa rústica com varanda, perfeita para quem busca contato com a natureza.',
    city: 'Sorocaba',
    state: 'SP',
    photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
    price: 250,
    amenities: ['Varanda', 'Estacionamento'],
    kitchen: 1,
    bedroom: 3,
    bathroom: 2,
    wifi: false,
    laundry: false,
    availableFrom: '2025-05-10',
    availableTo: '2025-10-30',
    rating: 4.0
  },
  {
    id: 7,
    name: 'Casarão Condomínio Fechado',
    description: 'Casarão em condomínio fechado, segurança e conforto garantidos.',
    city: 'Campinas',
    state: 'SP',
    photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
    price: 220,
    amenities: ['Portaria 24h', 'Garagem'],
    kitchen: 1,
    bedroom: 2,
    bathroom: 1,
    wifi: true,
    laundry: true,
    availableFrom: '2025-08-01',
    availableTo: '2025-12-31',
    rating: 4.1
  },
  {
    id: 8,
    name: 'Apartamento Moderno Próximo à USP',
    description: 'Apartamento moderno e bem equipado, ideal para estudantes e profissionais.',
    city: 'Campinas',
    state: 'SP',
    photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
    price: 550,
    amenities: ['Academia', 'Piscina', 'Coworking'],
    kitchen: 1,
    bedroom: 4,
    bathroom: 3,
    wifi: true,
    laundry: true,
    availableFrom: '2025-05-01',
    availableTo: '2025-12-31',
    rating: 4.8
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
