import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICheckpoints, Checkpoints } from 'app/shared/model/checkpoints.model';
import { CheckpointsService } from './checkpoints.service';
import { ICheckup } from 'app/shared/model/checkup.model';
import { CheckupService } from 'app/entities/checkup/checkup.service';

@Component({
  selector: 'jhi-checkpoints-update',
  templateUrl: './checkpoints-update.component.html',
})
export class CheckpointsUpdateComponent implements OnInit {
  isSaving = false;
  checkups: ICheckup[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    note: [null, [Validators.required]],
    checkup: [],
  });

  constructor(
    protected checkpointsService: CheckpointsService,
    protected checkupService: CheckupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkpoints }) => {
      this.updateForm(checkpoints);

      this.checkupService.query().subscribe((res: HttpResponse<ICheckup[]>) => (this.checkups = res.body || []));
    });
  }

  updateForm(checkpoints: ICheckpoints): void {
    this.editForm.patchValue({
      id: checkpoints.id,
      libelle: checkpoints.libelle,
      note: checkpoints.note,
      checkup: checkpoints.checkup,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const checkpoints = this.createFromForm();
    if (checkpoints.id !== undefined) {
      this.subscribeToSaveResponse(this.checkpointsService.update(checkpoints));
    } else {
      this.subscribeToSaveResponse(this.checkpointsService.create(checkpoints));
    }
  }

  private createFromForm(): ICheckpoints {
    return {
      ...new Checkpoints(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      note: this.editForm.get(['note'])!.value,
      checkup: this.editForm.get(['checkup'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICheckpoints>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICheckup): any {
    return item.id;
  }
}
