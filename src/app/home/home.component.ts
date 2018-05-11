import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../service/userService';
import { AuthService } from '../service/authService';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
static logMode = true;
 constructor(public snackBar: MatSnackBar, private userService:UserService, private authService:AuthService, private notif: NotificationsService){
 }
  ngOnInit() {
    console.log(" connecté? ="+this.authService.getIsloggedIn());
      this.userService.getUser().subscribe(result => {
        console.log(result);
        if(result.success == true){
          if(HomeComponent.logMode){
          this.notif.info(
              'Infos',
              "Bienvenue "+result.data.firstName,
              {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 50
              }
            )
          }
          //this.openSnackBar("Bienvenue "+result.data.firstName, "Connecté");
          HomeComponent.logMode = false;

          if(result.piecesNotifQuantity.length > 0){
            for(let i =0; i< result.piecesNotifQuantity.length; i++){
              console.log("le stock de la piece "+result.piecesNotifQuantity[i].reference_name+" est bientot épuisé");
              //this.flashMessagesService.show("le stock de la piece "+res.pieces[i].reference_name+" est bientot épuisé", { cssClass: 'alert-danger', timeout: 4000 });
              //this.flashMessagesService.grayOut(true);
              this.notif.error(
                'Error',
                "le stock de la piece "+result.piecesNotifQuantity[i].reference_name+" est bientot épuisé",
                {
                  timeOut: 15000,
                  showProgressBar: true,
                  pauseOnHover: false,
                  clickToClose: true,
                  maxLength: 50
                }
              )
            }
          }
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
