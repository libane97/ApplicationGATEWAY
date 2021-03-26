import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICheckpoints } from 'app/shared/model/checkpoints.model';

@Component({
  selector: 'jhi-checkpoints-detail',
  templateUrl: './checkpoints-detail.component.html',
})
export class CheckpointsDetailComponent implements OnInit {
  checkpoints: ICheckpoints | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkpoints }) => (this.checkpoints = checkpoints));
  }

  previousState(): void {
    window.history.back();
  }
}
