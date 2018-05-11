import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PieceService } from '../service/pieceService';
@Component({
  selector: 'app-stock-update-dialog',
  templateUrl: './stock-update-dialog.component.html',
  styleUrls: ['./stock-update-dialog.component.css']
})

export class StockUpdateDialogComponent implements OnInit{


    myForm: FormGroup;
    quantityRegex: any = '[0-9]*';
   quantityMax: any = 30;
   quantityMin: any = 1;
   pieceId: any;

  constructor(public dialogRef: MatDialogRef<StockUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private pieceService: PieceService
) { 
      this.myForm = fb.group({ 
        'quantity': [ null,  Validators.compose([ Validators.required, Validators.pattern(this.quantityRegex),Validators.required,  Validators.min(this.quantityMin) ,Validators.required, Validators.max(this.quantityMax)]) ]
       });
      this.myForm.valueChanges.subscribe((form: any) => {
        
      });
      this.pieceId = data.pieceId;
    }
    ngOnInit() {
    
    }

  updatePiece(formResult:any): void {
    this.dialogRef.close({quantity: formResult.quantity, pieceId: this.pieceId});
  }
}