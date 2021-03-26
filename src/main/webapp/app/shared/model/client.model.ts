import { IVoiture } from 'app/shared/model/voiture.model';

export interface IClient {
  id?: number;
  name?: string;
  telephone?: string;
  adress?: string;
  voitures?: IVoiture[];
}

export class Client implements IClient {
  constructor(public id?: number, public name?: string, public telephone?: string, public adress?: string, public voitures?: IVoiture[]) {}
}
