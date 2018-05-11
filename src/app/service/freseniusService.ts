import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions , Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Fresenius } from '../models/fresenius';
import { Reparation } from '../models/reparation';
import { Piece } from '../models/piece';
import { FormReparation } from '../models/form';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class FreseniusService {

  private newReparationUrl = "/new-reparation";
  private reparationListUrl = "/reparation-list";

  private reparationDetailsUrl = "/reparation-details/";

  constructor(private _http: Http) { }
  
  getFreseniusz(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(this.reparationListUrl, options).map((response: Response) => response.json());
  }

  getDetails(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(this.reparationDetailsUrl + id, options).map((response: Response) => response.json());
  }
  
  deleteFresenius(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.delete(this.reparationDetailsUrl + id, options).map((response: Response) => response.json());
  }
  
  newRepair(reparation: FormReparation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.post(this.newReparationUrl, JSON.stringify(reparation), options).map((response: Response) => response.json());
  }

  updateReparation(requestName: any, id:any, state:any, form:any){
    let data = {requestName: requestName, id: id, state: state, form: form};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.put(this.reparationDetailsUrl + id, JSON.stringify(data), options).map((response: Response) => response.json());
  }
}
