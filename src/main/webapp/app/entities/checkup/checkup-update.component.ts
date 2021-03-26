import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICheckup, Checkup } from 'app/shared/model/checkup.model';
import { CheckupService } from './checkup.service';
import { IVoiture } from 'app/shared/model/voiture.model';
import { VoitureService } from 'app/entities/voiture/voiture.service';

@Component({
  selector: 'jhi-checkup-update',
  templateUrl: './checkup-update.component.html',
})
export class CheckupUpdateComponent implements OnInit {
  isSaving = false;
  voitures: IVoiture[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    dateCheck: [null, [Validators.required]],
    voiture: [],
  });

  constructor(
    protected checkupService: CheckupService,
    protected voitureService: VoitureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkup }) => {
      if (!checkup.id) {
        const today = moment().startOf('day');
        checkup.dateCheck = today;
      }

      this.updateForm(checkup);

      this.voitureService.query().subscribe((res: HttpResponse<IVoiture[]>) => (this.voitures = res.body || []));
    });
  }

  updateForm(checkup: ICheckup): void {
    this.editForm.patchValue({
      id: checkup.id,
      libelle: checkup.libelle,
      dateCheck: checkup.dateCheck ? checkup.dateCheck.format(DATE_TIME_FORMAT) : null,
      voiture: checkup.voiture,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const checkup = this.createFromForm();
    if (checkup.id !== undefined) {
      this.subscribeToSaveResponse(this.checkupService.update(checkup));
    } else {
      this.subscribeToSaveResponse(this.checkupService.create(checkup));
    }
  }

  private createFromForm(): ICheckup {
    return {
      ...new Checkup(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      dateCheck: this.editForm.get(['dateCheck'])!.value ? moment(this.editForm.get(['dateCheck'])!.value, DATE_TIME_FORMAT) : undefined,
      voiture: this.editForm.get(['voiture'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICheckup>>): void {
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

  trackById(index: number, item: IVoiture): any {
    return item.id;
  }
}
