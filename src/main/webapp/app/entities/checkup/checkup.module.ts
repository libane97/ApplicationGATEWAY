import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DjibGateSharedModule } from 'app/shared/shared.module';
import { CheckupComponent } from './checkup.component';
import { CheckupDetailComponent } from './checkup-detail.component';
import { CheckupUpdateComponent } from './checkup-update.component';
import { CheckupDeleteDialogComponent } from './checkup-delete-dialog.component';
import { checkupRoute } from './checkup.route';

@NgModule({
  imports: [DjibGateSharedModule, RouterModule.forChild(checkupRoute)],
  declarations: [CheckupComponent, CheckupDetailComponent, CheckupUpdateComponent, CheckupDeleteDialogComponent],
  entryComponents: [CheckupDeleteDialogComponent],
})
export class DjibGateCheckupModule {}
