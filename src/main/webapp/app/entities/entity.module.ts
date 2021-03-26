import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.DjibGateClientModule),
      },
      {
        path: 'voiture',
        loadChildren: () => import('./voiture/voiture.module').then(m => m.DjibGateVoitureModule),
      },
      {
        path: 'checkup',
        loadChildren: () => import('./checkup/checkup.module').then(m => m.DjibGateCheckupModule),
      },
      {
        path: 'checkpoints',
        loadChildren: () => import('./checkpoints/checkpoints.module').then(m => m.DjibGateCheckpointsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class DjibGateEntityModule {}
