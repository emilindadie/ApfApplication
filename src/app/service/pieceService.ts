import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Piece } from '../models/piece';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PieceService {
  private newStockUrl = "/new-stock";
  private manageStockUrl = "/stock-manage";
  private reparationDetailsUrl = 'reparation-details/'

  constructor(private _http: Http) { }

  newPiece(piece:Piece){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.post(this.newStockUrl, JSON.stringify(piece), options).map((response: Response) => response.json());
  }

  getAllPieces(url){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(url, options).map((response: Response) => response.json());
  }

  getDetails(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(this.reparationDetailsUrl + id, options).map((response: Response) => response.json());
  }

  delete(id){
    let data = {id: id};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.post(this.manageStockUrl, JSON.stringify(data), options).map((response: Response) => response.json());
  }

  updatePiece(id:any, quantity:any){
    let data = {id: id, quantity: quantity};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.put(this.manageStockUrl, JSON.stringify(data), options).map((response: Response) => response.json());
  }

  updatePieceStatus(id:any, status:any){
    let data = {id: id, status: status};
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.put(this.reparationDetailsUrl, JSON.stringify(data), options).map((response: Response) => response.json());
  }
}
