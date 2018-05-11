import { Component, OnInit } from '@angular/core';
import { Fresenius } from '../models/fresenius';
import { FreseniusService } from '../service/freseniusService';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Piece } from '../models/piece';
import { Observable } from 'rxjs/Observable';
import { PieceService } from '../service/pieceService';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ReparationStateUpdateDialogComponent } from '../reparation-state-update-dialog/reparation-state-update-dialog.component';
import { ReparationInformationDialogComponent } from '../reparation-information-dialog/reparation-information-dialog.component';
import { User } from '../models/user';
import { ReparationInformationUpdateDialogComponent } from '../reparation-information-update-dialog/reparation-information-update-dialog.component';
import { NotificationsService } from 'angular2-notifications';
import { multicast } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-reparation-details',
  templateUrl: './reparation-details.component.html',
  styleUrls: ['./reparation-details.component.css'],
  providers: [FreseniusService, PieceService]

})
export class ReparationDetailsComponent implements OnInit {

  fresenius:Fresenius = new Fresenius();

  reparator: User = new User();
  test_validator: User = new User();
  send_validator: User = new User();
  last_modificator : User = new User();
  pieces:Piece = new Piece();
  piecesUpdate:Piece = new Piece();
  piecesLength:any;
  //piecesCollection: Array<Piece> = new Array();
  
  displayedColumns = ['quantity', 'reference_name', 'description','lot_number'];

  myData: Array < any > = new Array();
  myData2: Array < any > = new Array();
  dataSource: MyDataSource;
  dataSource2: MyDataSource;

  constructor(private freseniusService:FreseniusService, private route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar,private notif: NotificationsService) { }

  public getDetails(id) {
    this.myData = new Array();
    this.myData2 = new Array();
    this.freseniusService.getDetails(id)
      .subscribe(res => {
        if(res.status == true){
          console.log(res);
        console.log(res.user);
        var result = res;
        this.fresenius = result.fresenius;
        this.reparator = result.reparator;
        this.test_validator = result.test_validator;
        this.send_validator = result.send_validator;
        this.last_modificator = result.last_modificator;
        this.piecesLength = result.pieces.length +1;
        this.piecesUpdate = result.pieces;
        this.pieces = result.pieces;

        if(result.pieces.length === 12){
          this.myData = result.pieces;
        }else {
          for(let i = 0; i < 12; i++){
            this.myData.push(result.pieces[i]);
          }
          for(let i = 12; i < result.pieces.length; i++){
              this.myData2.push(result.pieces[i]);
          }
        }

        this.dataSource = new MyDataSource(this.myData);
        this.dataSource2 = new MyDataSource(this.myData2);
        }
        this.stopLoading();
      });
  }
  
  startRequest() {
    setTimeout(() => {
       this.getDetails(this.route.snapshot.params['fresenius_id']);
    }, 1000);
  }
  
  ngOnInit() {
    console.log(this.route.snapshot.params['fresenius_id']);
    this.startLoading();
     this.startRequest();
    }

    stateUpdateOpendialog(): void {
      let dialogRef = this.dialog.open(ReparationStateUpdateDialogComponent, {
        width: '30%',
        height: '30%',
        data: {fresenius: this.fresenius}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          if(result.sender == "state"){
            this.freseniusService.updateReparation("update-state",this.fresenius._id, result.action, null).subscribe(result => {
              if(result.status == true){
                console.log("update success");
                  this.notif.success(
                    'Success',
                    "Status modifié",
                    {
                      timeOut: 3000,
                      showProgressBar: true,
                      pauseOnHover: false,
                      clickToClose: true,
                      maxLength: 50
                    }
                  )
                  this.startLoading();
                  this.startRequest();
              }else {
                console.log("update failed");
                this.notif.error(
                  'Error',
                  "La modification du status a échoué",
                  {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: false,
                    clickToClose: true,
                    maxLength: 50
                  }
                )
              }
    
            })
          }
        }
      })
    }

    informationUpdateOpendialog(){
      let dialogRef = this.dialog.open(ReparationInformationUpdateDialogComponent, {
        width: '40%',
        height: '75%',
        data: {fresenius: this.fresenius,pieces: this.piecesUpdate, piecesLength: this.piecesLength}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          if(result.sender == "information"){
            if(result.status == true){
              console.log("update success");
               this.notif.success(
                 'Success',
                 "modification de la reparation reussite",
                 {
                   timeOut: 3000,
                   showProgressBar: true,
                   pauseOnHover: false,
                   clickToClose: true,
                   maxLength: 50
                 }
               )
                this.startLoading();
                this.startRequest();
            }
          } 
        }
      })
    }
    informationViewOpendialog(): void{
      let dialogRef = this.dialog.open(ReparationInformationDialogComponent, {
        width: '40%',
        height: '43%',
        data: {fresenius: this.fresenius, reparator: this.reparator, test_validator: this.test_validator, send_validator: this.send_validator, last_modificator: this.last_modificator}
      });

      dialogRef.afterClosed().subscribe(result => {
      })
    }

    startLoading(){
      var formElement = <HTMLFormElement>document.getElementById('freseniusDetails-container');
      formElement.style.display='none';
      var formElement = <HTMLFormElement>document.getElementById('reparation-details-mat-spinner');
      formElement.style.display='block';
    }

    stopLoading(){
      var formElement = <HTMLFormElement>document.getElementById('reparation-details-mat-spinner');
      formElement.style.display='none';
      var formElement = <HTMLFormElement>document.getElementById('freseniusDetails-container');
      formElement.style.display='block';
    }
}

export class MyDataSource extends DataSource <any> {

   constructor(private dataBase: Piece[]) {
    super();
  }
  
  connect(): Observable <Piece[]> {
      return Observable.of(this.dataBase);
  }

  disconnect() {}
}
