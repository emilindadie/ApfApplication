import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../service/userService';
import { Fresenius } from '../models/fresenius';
import { FreseniusService } from '../service/freseniusService';

import { Piece } from '../models/piece';
import { Reparation } from '../models/reparation';
import { FormReparation } from '../models/form';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PieceService } from '../service/pieceService';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { MatSnackBar, MatOptionSelectionChange, MatAutocompleteSelectedEvent } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-new-reparation',
  templateUrl: './new-reparation.component.html',
  styleUrls: ['./new-reparation.component.css'],
  providers: [FreseniusService]
})
export class NewReparationComponent implements OnInit {

  @ViewChild('myname') input:ElementRef; 

  fresenius:Fresenius;
  freseniusz: Array<Fresenius> = new Array();
  formReparations: Array<FormReparation> = new Array();
  formReparation:FormReparation;
  date: String; 
  tmpForm: FormReparation; 
  success: boolean = false
  index: number = 1;
  pieces: Array<Piece> = new Array();
  private stockListUrl = "/new-reparation";
  myForm: FormGroup;

  constructor(private freseniusService: FreseniusService, private pieceService:PieceService, private elementRef:ElementRef, fb: FormBuilder, private notif: NotificationsService) { 
    this.myForm = fb.group({
      'client_name': [ null, Validators.compose([ Validators.required]) ],
      'bill_point':  [ null, Validators.compose([ Validators.required]) ],
      'deliver_point':  [ null, Validators.compose([ Validators.required]) ],
      'client_code_number': [ null, Validators.compose([ Validators.required]) ],
      'sap_order_number':  [ null, Validators.compose([ Validators.required]) ],
      'receipt_date':  [ this.date, Validators.compose([ Validators.required]) ],
      'fresenius_type': [ null, Validators.compose([ Validators.required]) ],
      'device_number':  [ null, Validators.compose([ Validators.required]) ],
      'product_code': [ null, Validators.compose([ Validators.required, Validators.minLength(7), Validators.maxLength(7)]) ],
      'bio_number' : [ null, null],
      'entry_number' : [ null, null],
      'declared_defect': [ null, Validators.compose([ Validators.required]) ],
      'defect_found': [ null, Validators.compose([ Validators.required]) ],
      'intervention': [ null, Validators.compose([ Validators.required]) ],
      'past_time': [ null, Validators.compose([ Validators.required]) ],
      'piece_reference_name1': [ null, Validators.compose([ Validators.required])],
      'piece_reference_name2': [ "", null],
      'piece_reference_name3': [ "", null],
      'piece_reference_name4': [ "", null],
      'piece_reference_name5': [ "", null],
      'piece_reference_name6': [ "", null],
      'piece_reference_name7': [ "", null],
      'piece_reference_name8': [ "", null],
      'piece_reference_name9': [ "", null],
      'piece_reference_name10': [ "", null],
      'piece_reference_name11': [ "", null],
      'piece_reference_name12': [ "", null],
      'piece_reference_name13': [ "", null],
      'piece_reference_name14': [ "", null],
      'piece_reference_name15': [ "", null],
      'piece_reference_name16': [ "", null]
   });
   
    this.myForm.valueChanges.subscribe((form: any) => {
    }); 
  }

  ngOnInit() {
    this.pieceService.getAllPieces(this.stockListUrl).subscribe(result=> {
      console.log(result);
      this.pieces = result.pieces;
      this.date = result.date;
      this.myForm.controls['receipt_date'].setValue(result.date);
    });
  
    for(var i=2; i <= 16 ; i++){
      var formElement = <HTMLFormElement>document.getElementById('divPiece'+i);
      formElement.style.display='none';
    }
    
    if(this.index == 1){
      var formElement = <HTMLFormElement>document.getElementById('lessButton');
      formElement.style.display='none';
    }
  }

  _keyPress(event: any) {
    let inputChar = event.length;
    console.log(inputChar);
    if (inputChar > 7) {
      event.preventDefault();
    }
}
  repairFresenius(form:FormReparation){
      this.freseniusService.newRepair(form).subscribe(
      resNewReparation => {
        if(resNewReparation.success){
          this.notif.success(
            'Success',
            'Reparation reussite',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: true,
              maxLength: 50
            }
          )
          this.formReparations.push(resNewReparation);
          this.formReparation = resNewReparation;
          this.success = true
        }else {
          if(resNewReparation.error_type == "quantity_unavailable"){
            this.notif.info(
              'Info',
              'La quantité disponible de la piece de reference '+resNewReparation.piece.reference_name+ ' est : '+resNewReparation.piece.quantity,
              {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 50
              }
            )
          }
          else{
            this.notif.error(
              'Error',
              'Le numéro d\'appareil est déja enregistré !',
              {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true,
                maxLength: 50
              }
            )
          }
        }
    });
  }

  morePiece(){
    
    this.index++;
    var formElement = <HTMLFormElement>document.getElementById('divPiece'+this.index);
    formElement.style.display='block';
    var formElement2 = <HTMLFormElement>document.getElementById('lessButton');
    formElement2.style.display='block';

    if(this.index == 16){
      var formElement2 = <HTMLFormElement>document.getElementById('moreButton');
      formElement2.style.display='none';
    }
  }


  lessPiece(){
    var formElement = <HTMLFormElement>document.getElementById('divPiece'+this.index);
    formElement.style.display='none';
    this.resetPieceSelectInput();
    this.index--;
    if(this.index == 1){
      var formElement2 = <HTMLFormElement>document.getElementById('lessButton');
      formElement2.style.display='none';
    }
    else{
      var formElement2 = <HTMLFormElement>document.getElementById('moreButton');
      formElement2.style.display='block';
      formElement2.style.cssFloat='left';
    }
  }

  resetPieceSelectInput(){
    for(let i = 2; i < 17; i++){
      if(this.index == i){
        this.myForm.controls['piece_reference_name'+i].setValue("");
      }
    }
  }
}
