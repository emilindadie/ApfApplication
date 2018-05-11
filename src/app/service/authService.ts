import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Console } from "@angular/core/src/console";
import { User } from "../models/user";


@Injectable()
export class AuthService {
    private redirectUrl: string = '/';
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser: User;

  constructor(private _http: Http) { }
  
    getIsloggedIn() : boolean{
        return this.isloggedIn;
    }
    setIsloggedIn(value){
        this.isloggedIn = value;
    }

    setLoggedInUser(value) {
        this.loggedInUser = value;
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getLoginUrl(): string {
        return this.loginUrl;
    }

    logoutUser(): void{
        this.isloggedIn = false;
        this.loggedInUser = null;
    }
}