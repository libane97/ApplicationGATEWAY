import { Moment } from 'moment';
import { ICheckpoints } from 'app/shared/model/checkpoints.model';
import { IVoiture } from 'app/shared/model/voiture.model';

export interface ICheckup {
  id?: number;
  libelle?: string;
  dateCheck?: Moment;
  checkpoints?: ICheckpoints[];
  voiture?: IVoiture;
}

export class Checkup implements ICheckup {
  constructor(
    public id?: number,
    public libelle?: string,
    public dateCheck?: Moment,
    public checkpoints?: ICheckpoints[],
    public voiture?: IVoiture
  ) {}
}
