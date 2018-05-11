import { Component, OnInit } from '@angular/core';
import { Piece } from '../models/piece';
import { PieceService } from '../service/pieceService';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css'],
  providers: [PieceService]
})
export class NewStockComponent implements OnInit {
  piece:Piece;
  pieces: Array<Piece> = new Array();
  myForm: FormGroup;
  quantityRegex: any = '[0-9]*';
 

  constructor(private pieceService :PieceService, fb: FormBuilder, private notif: NotificationsService) { 
    this.myForm = fb.group({
      'reference_name': [ null, Validators.compose([ Validators.required]) ],
      'lot_number': [ null, null],
      'quantity': [ null, Validators.compose([ Validators.pattern(this.quantityRegex),Validators.required]) ],
      'min_quantity_level': [ null, null],
      'description': [ null, null]
   });
  
   this.myForm.valueChanges.subscribe((form: any) => {
     console.log(this.myForm.controls['quantity'].valueChanges);
     this.myForm.controls['quantity'].valueChanges.subscribe(res => {
        let quantityMax : number = res;
        this.myForm.controls['min_quantity_level'].setValidators(Validators.compose([ ,Validators.required, Validators.pattern(this.quantityRegex),  Validators.required, Validators.max(quantityMax)]))
     })
    }); 
  }

  ngOnInit() {
  }

  newPiece(piece:Piece){
    this.pieceService.newPiece(piece).subscribe(
      resNewPiece => {
        this.pieces.push(resNewPiece);
        this.piece = resNewPiece;
        if(resNewPiece.status == true){
          this.notif.success(
            'Success',
            'la pièce à été crée',
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
