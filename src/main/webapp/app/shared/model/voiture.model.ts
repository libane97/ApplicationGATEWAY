import { ICheckup } from 'app/shared/model/checkup.model';
import { IClient } from 'app/shared/model/client.model';

export interface IVoiture {
  id?: number;
  title?: string;
  price?: number;
  moteur?: string;
  checkups?: ICheckup[];
  client?: IClient;
}

export class Voiture implements IVoiture {
  constructor(
    public id?: number,
    public title?: string,
    public price?: number,
    public moteur?: string,
    public checkups?: ICheckup[],
    public client?: IClient
  ) {}
}
