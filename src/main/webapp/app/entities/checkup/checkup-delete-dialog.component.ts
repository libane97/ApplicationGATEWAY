import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICheckup } from 'app/shared/model/checkup.model';
import { CheckupService } from './checkup.service';

@Component({
  templateUrl: './checkup-delete-dialog.component.html',
})
export class CheckupDeleteDialogComponent {
  checkup?: ICheckup;

  constructor(protected checkupService: CheckupService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.checkupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('checkupListModification');
      this.activeModal.close();
    });
  }
}
