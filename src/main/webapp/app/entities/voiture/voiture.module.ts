import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DjibGateSharedModule } from 'app/shared/shared.module';
import { VoitureComponent } from './voiture.component';
import { VoitureDetailComponent } from './voiture-detail.component';
import { VoitureUpdateComponent } from './voiture-update.component';
import { VoitureDeleteDialogComponent } from './voiture-delete-dialog.component';
import { voitureRoute } from './voiture.route';

@NgModule({
  imports: [DjibGateSharedModule, RouterModule.forChild(voitureRoute)],
  declarations: [VoitureComponent, VoitureDetailComponent, VoitureUpdateComponent, VoitureDeleteDialogComponent],
  entryComponents: [VoitureDeleteDialogComponent],
})
export class DjibGateVoitureModule {}
