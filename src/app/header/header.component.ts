import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/authService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showFiller = false;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
    
  }
  
  deconnexion(){
    localStorage.removeItem('jwtToken');
    this.authService.logoutUser();
    this.router.navigate([ this.authService.getLoginUrl()]);	
  }
}
