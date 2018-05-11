import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/userService';
import { User } from '../models/user';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {

  user:User;
  users: Array<User> = new Array();
  constructor(private userService: UserService, private notif: NotificationsService) { }

  ngOnInit() {
  }
  
  saveUser(user:User){
    this.userService.saveUser(user).subscribe(
      resNewUser => {
        if(resNewUser.success){
              this.notif.success(
                'Success',
                "votre compte a été créer",
                {
                  timeOut: 3000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 50
                }
              )
        }else {
          this.notif.error(
            'Error',
            "Inscription échoué",
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
        }
      });
  }
}
