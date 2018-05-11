import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Fresenius } from '../models/fresenius';
import { Piece } from '../models/piece';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { FreseniusService } from '../service/freseniusService';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operator/first';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-reparation-information-update-dialog',
  templateUrl: './reparation-information-update-dialog.component.html',
  styleUrls: ['./reparation-information-update-dialog.component.css'],
  providers: [FreseniusService]

})
export class ReparationInformationUpdateDialogComponent implements OnInit {
  fresenius:Fresenius = new Fresenius();
  pieces:Piece = new Piece();
  myForm: FormGroup;
  piecesLength:any;

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<ReparationInformationUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private freseniusService : FreseniusService, private notif: NotificationsService,private route: ActivatedRoute) { 
  this.fresenius = data.fresenius;
  console.log(this.fresenius);
  this.pieces = data.pieces;
  this.piecesLength = data.piecesLength;

    this.myForm = fb.group({
      'client_name': [ this.fresenius.client_name, Validators.compose([ Validators.required]) ],
      'bill_point':  [ this.fresenius.bill_point, Validators.compose([ Validators.required]) ],
      'deliver_point':  [ this.fresenius.deliver_point, Validators.compose([ Validators.required]) ],
      'client_code_number': [ this.fresenius.client_code_number, Validators.compose([ Validators.required]) ],
      'sap_order_number':  [ this.fresenius.sap_order_number, Validators.compose([ Validators.required]) ],
      'receipt_date':  [ this.fresenius.receipt_date, Validators.compose([ Validators.required]) ],
      'fresenius_type': [ this.fresenius.fresenius_type, Validators.compose([Validators.required])],
      'product_code' : [ this.fresenius.product_code, Validators.compose([Validators.required])],
      'declared_defect' : [ this.fresenius.declared_defect,Validators.compose([Validators.required])],
      'defect_found' : [ this.fresenius.defect_found, Validators.compose([Validators.required])],
      'intervention' : [ this.fresenius.interventionLine1, Validators.compose([Validators.required])],
      'past_time' : [ this.fresenius.past_time, Validators.compose([Validators.required])]
    });

    if(this.fresenius.interventionLine2 != undefined && this.fresenius.interventionLine3 == undefined){
      this.myForm.get("intervention").setValue(this.fresenius.interventionLine1 + this.fresenius.interventionLine2);
    }
    else if(this.fresenius.interventionLine2 != undefined && this.fresenius.interventionLine3 != undefined){
      this.myForm.get("intervention").setValue(this.fresenius.interventionLine1 + this.fresenius.interventionLine2 + this.fresenius.interventionLine3);
    }
  }

  ngOnInit() {
    
  }

  updateReparation(formResult:any){
    let id = this.fresenius._id;
    console.log(formResult);
    this.freseniusService.updateReparation("update-reparation",id,null,formResult).subscribe(res => {
      if(res.status == true){
        console.log("success");
        this.dialogRef.close({sender: "information", status: true});
      }else{
        console.log("error");
        this.notif.success(
          'Error',
          "Informations non mise à jour",
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
