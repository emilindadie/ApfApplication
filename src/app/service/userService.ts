import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Injectable()
export class UserService {

  private signUpUrl = "/sign-up";
  private loginUrl = '/login';
  private homeUrl = '/home';

  constructor(private _http: Http, private router:Router) { }
  
  getUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('jwtToken'));
    let options = new RequestOptions({headers : headers});
    return this._http.get(this.homeUrl, options)
      .map((response: Response) => response.json());
  }

  getUsers() {
    return this._http.get(this.loginUrl)
      .map((response: Response) => response.json());
  }

  LogUser(user:User) {
    let headers = new Headers({ 'Content-type': 'application/json'});
    let options = new RequestOptions({headers : headers});
    return this._http.post(this.loginUrl, JSON.stringify(user), options).map((response: Response) => response.json());
  }
 
  saveUser(user:User){
      let headers = new Headers({ 'Content-type': 'application/json'});
      let options = new RequestOptions({headers : headers});
      return this._http.put(this.signUpUrl, JSON.stringify(user), options).map((response: Response) => response.json());
  }
}
