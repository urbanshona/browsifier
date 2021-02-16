import { Continent } from './Continent';
import { Province } from './Province';

export class Country {
 id: number;
 code: string;
 continentId: number;
 name: string | null;
 continent: Continent;
 provinces: Province[];
}

