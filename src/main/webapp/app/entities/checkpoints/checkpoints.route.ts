import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICheckpoints, Checkpoints } from 'app/shared/model/checkpoints.model';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsComponent } from './checkpoints.component';
import { CheckpointsDetailComponent } from './checkpoints-detail.component';
import { CheckpointsUpdateComponent } from './checkpoints-update.component';

@Injectable({ providedIn: 'root' })
export class CheckpointsResolve implements Resolve<ICheckpoints> {
  constructor(private service: CheckpointsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICheckpoints> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((checkpoints: HttpResponse<Checkpoints>) => {
          if (checkpoints.body) {
            return of(checkpoints.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Checkpoints());
  }
}

export const checkpointsRoute: Routes = [
  {
    path: '',
    component: CheckpointsComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'djibGateApp.checkpoints.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CheckpointsDetailComponent,
    resolve: {
      checkpoints: CheckpointsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'djibGateApp.checkpoints.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CheckpointsUpdateComponent,
    resolve: {
      checkpoints: CheckpointsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'djibGateApp.checkpoints.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CheckpointsUpdateComponent,
    resolve: {
      checkpoints: CheckpointsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'djibGateApp.checkpoints.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
