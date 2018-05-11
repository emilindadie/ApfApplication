import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/authService";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
 
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        console.log('Url:'+ url);
        if (this.authService.getIsloggedIn()) {
            return true; 
        }
        this.authService.setRedirectUrl(url);
        this.router.navigate([ this.authService.getLoginUrl() ]);
        return false;
    }
}