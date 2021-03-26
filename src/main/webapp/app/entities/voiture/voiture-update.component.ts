import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVoiture, Voiture } from 'app/shared/model/voiture.model';
import { VoitureService } from './voiture.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-voiture-update',
  templateUrl: './voiture-update.component.html',
})
export class VoitureUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    price: [null, [Validators.required, Validators.min(0)]],
    moteur: [null, [Validators.required]],
    client: [],
  });

  constructor(
    protected voitureService: VoitureService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ voiture }) => {
      this.updateForm(voiture);

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(voiture: IVoiture): void {
    this.editForm.patchValue({
      id: voiture.id,
      title: voiture.title,
      price: voiture.price,
      moteur: voiture.moteur,
      client: voiture.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const voiture = this.createFromForm();
    if (voiture.id !== undefined) {
      this.subscribeToSaveResponse(this.voitureService.update(voiture));
    } else {
      this.subscribeToSaveResponse(this.voitureService.create(voiture));
    }
  }

  private createFromForm(): IVoiture {
    return {
      ...new Voiture(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      price: this.editForm.get(['price'])!.value,
      moteur: this.editForm.get(['moteur'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoiture>>): void {
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

  trackById(index: number, item: IClient): any {
    return item.id;
  }
}
