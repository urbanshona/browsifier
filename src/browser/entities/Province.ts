import { City } from './City';
import { Country } from './Country';

export class Province {
 id: number;
 name: string;
 postalCode: string | null;
 countryId: number;
 cities: City[];
 country: Country;
}

