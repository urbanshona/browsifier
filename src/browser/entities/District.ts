import { City } from './City';

export class District {
 id: number;
 name: string;
 postalCode: string | null;
 cityId: number;
 city: City;
}

