import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICheckpoints } from 'app/shared/model/checkpoints.model';

type EntityResponseType = HttpResponse<ICheckpoints>;
type EntityArrayResponseType = HttpResponse<ICheckpoints[]>;

@Injectable({ providedIn: 'root' })
export class CheckpointsService {
  public resourceUrl = SERVER_API_URL + 'api/checkpoints';

  constructor(protected http: HttpClient) {}

  create(checkpoints: ICheckpoints): Observable<EntityResponseType> {
    return this.http.post<ICheckpoints>(this.resourceUrl, checkpoints, { observe: 'response' });
  }

  update(checkpoints: ICheckpoints): Observable<EntityResponseType> {
    return this.http.put<ICheckpoints>(this.resourceUrl, checkpoints, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICheckpoints>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICheckpoints[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
