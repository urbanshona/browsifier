import { Province } from './Province';
import { District } from './District';

export class City {
 id: number;
 name: string;
 provinceId: number;
 province: Province;
 districts: District[];
}

