import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICheckup } from 'app/shared/model/checkup.model';

type EntityResponseType = HttpResponse<ICheckup>;
type EntityArrayResponseType = HttpResponse<ICheckup[]>;

@Injectable({ providedIn: 'root' })
export class CheckupService {
  public resourceUrl = SERVER_API_URL + 'api/checkups';

  constructor(protected http: HttpClient) {}

  create(checkup: ICheckup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(checkup);
    return this.http
      .post<ICheckup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(checkup: ICheckup): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(checkup);
    return this.http
      .put<ICheckup>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICheckup>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICheckup[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(checkup: ICheckup): ICheckup {
    const copy: ICheckup = Object.assign({}, checkup, {
      dateCheck: checkup.dateCheck && checkup.dateCheck.isValid() ? checkup.dateCheck.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCheck = res.body.dateCheck ? moment(res.body.dateCheck) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((checkup: ICheckup) => {
        checkup.dateCheck = checkup.dateCheck ? moment(checkup.dateCheck) : undefined;
      });
    }
    return res;
  }
}
