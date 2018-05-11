import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class OperationService {

  constructor(private _http: Http) { }

  getAllOperation(url){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(url, options).map((response: Response) => response.json());
  }
}
