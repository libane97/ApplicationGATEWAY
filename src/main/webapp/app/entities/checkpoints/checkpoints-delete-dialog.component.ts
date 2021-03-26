import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICheckpoints } from 'app/shared/model/checkpoints.model';
import { CheckpointsService } from './checkpoints.service';

@Component({
  templateUrl: './checkpoints-delete-dialog.component.html',
})
export class CheckpointsDeleteDialogComponent {
  checkpoints?: ICheckpoints;

  constructor(
    protected checkpointsService: CheckpointsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.checkpointsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('checkpointsListModification');
      this.activeModal.close();
    });
  }
}
