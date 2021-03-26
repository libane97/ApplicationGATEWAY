import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICheckup } from 'app/shared/model/checkup.model';

@Component({
  selector: 'jhi-checkup-detail',
  templateUrl: './checkup-detail.component.html',
})
export class CheckupDetailComponent implements OnInit {
  checkup: ICheckup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ checkup }) => (this.checkup = checkup));
  }

  previousState(): void {
    window.history.back();
  }
}
