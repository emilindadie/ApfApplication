import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userService';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../service/authService';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  users: Array<User> = new Array();
  data: any;
  myForm: FormGroup;
  emailRegex: any = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  // passRegex:any ='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$'; 
   passRegex:any ='^.{1,150}$'; 

  constructor(private userService: UserService, private router:Router, private flashMessagesService: FlashMessagesService, fb: FormBuilder,private authService:AuthService){
    console.log(" connecté? ="+this.authService.getIsloggedIn());
    this.myForm = fb.group({
      'email': [ null, Validators.compose([ Validators.required, Validators.pattern(this.emailRegex) ]) ],
      'password': [ null, Validators.compose([ Validators.required, Validators.pattern(this.passRegex) ]) ]
   });

    this.myForm.valueChanges.subscribe((form: any) => {
    });
  }

  ngOnInit() {
  }

  logUser(user: User){
    this.userService.LogUser(user).subscribe(
      resUser => {
        this.data = resUser;
        if(this.data.success){
          localStorage.setItem('jwtToken', this.data.token);
          console.log(localStorage);
            this.authService.setIsloggedIn(true);
			      this.authService.setLoggedInUser(this.data.user);
          HomeComponent.logMode = true;
          this.router.navigate(['/home']);
        }else{
          this.flashMessagesService.show('Adresse email ou mot de passe incorrect', { cssClass: 'alert-danger', timeout: 1800 });
        }
      });
  }
}
