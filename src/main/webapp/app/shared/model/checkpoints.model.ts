import { ICheckup } from 'app/shared/model/checkup.model';

export interface ICheckpoints {
  id?: number;
  libelle?: string;
  note?: number;
  checkup?: ICheckup;
}

export class Checkpoints implements ICheckpoints {
  constructor(public id?: number, public libelle?: string, public note?: number, public checkup?: ICheckup) {}
}
