export interface HousingLocation {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  photo: string;
  price: number;
  amenities: string[];
  kitchen: number;
  bedroom: number;
  bathroom: number;
  wifi: boolean;
  laundry: boolean;
  availableFrom: string; // ISO date string e.g., '2025-05-21'
  availableTo: string; // ISO date string e.g., '2025-06-21'
  rating: number; 
}
