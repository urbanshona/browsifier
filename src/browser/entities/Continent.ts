import { Country } from './Country';

export class Continent {
 id: number;
 code: string;
 name: string | null;
 countries: Country[];
}

