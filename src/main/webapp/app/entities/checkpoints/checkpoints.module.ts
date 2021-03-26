import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DjibGateSharedModule } from 'app/shared/shared.module';
import { CheckpointsComponent } from './checkpoints.component';
import { CheckpointsDetailComponent } from './checkpoints-detail.component';
import { CheckpointsUpdateComponent } from './checkpoints-update.component';
import { CheckpointsDeleteDialogComponent } from './checkpoints-delete-dialog.component';
import { checkpointsRoute } from './checkpoints.route';

@NgModule({
  imports: [DjibGateSharedModule, RouterModule.forChild(checkpointsRoute)],
  declarations: [CheckpointsComponent, CheckpointsDetailComponent, CheckpointsUpdateComponent, CheckpointsDeleteDialogComponent],
  entryComponents: [CheckpointsDeleteDialogComponent],
})
export class DjibGateCheckpointsModule {}
