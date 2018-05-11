import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Fresenius } from '../models/fresenius';

@Component({
  selector: 'app-reparation-state-update-dialog',
  templateUrl: './reparation-state-update-dialog.component.html',
  styleUrls: ['./reparation-state-update-dialog.component.css']
})
export class ReparationStateUpdateDialogComponent implements OnInit {

  selected  = 'action';
  buttonStatus = 'enabled';
  fresenius:Fresenius = new Fresenius();
  states = new Array();

  constructor(public dialogRef: MatDialogRef<ReparationStateUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.fresenius = data.fresenius;

    if(this.fresenius.status == 'test non validé'){
      this.states = [
        {value: 'action', viewValue: 'Action'},
        {value: 'valide', viewValue: 'Valider le test'},
      ]
    }
    else if(this.fresenius.status == 'test validé'){
      this.states = [
        {value: 'action', viewValue: 'Action'},
        {value: 'unvalide', viewValue: 'Ne pas valider le test'},
        {value: 'complete', viewValue: 'Completer'},
      ]
    }else {
      this.states = [
        {value: 'action', viewValue: 'Action'},
        {value: 'uncomplete', viewValue: 'Ne pas completer'},
      ]
    }
  }

  ngOnInit() {
   this.disabledSubmitButton();
  }

  updateReparation(){
    let action = "";
    if(this.selected == "valide"){
      action = "test validé"
    }
    else if(this.selected == "unvalide"){
      action = "test non validé"
    }
    else if(this.selected == "complete"){
      action = "complete"
    }
    else {
      action = "test non validé"
    }
   this.dialogRef.close({sender: "state", action: action});
  }

  onChange(event) {
    if(event.value == 'valide'){
      this.selected = 'valide';
      this.enabledSubmitButtton();
    }
    else if(event.value == 'unvalide'){
      this.selected = 'unvalide';
      this.enabledSubmitButtton();
    }
    else if(event.value == 'complete'){
      this.selected = 'complete';
      this.enabledSubmitButtton();
    }
    else if(event.value == 'uncomplete'){
      this.selected = 'uncomplete';
      this.enabledSubmitButtton();
    }
    else {
      this.selected = 'action';
      this.disabledSubmitButton();
    }
  }

  disabledSubmitButton(){
    var formElement = <HTMLFormElement>document.getElementById('saveButton');
    formElement.disabled= true;
  }

  enabledSubmitButtton(){
    var formElement = <HTMLFormElement>document.getElementById('saveButton');
    formElement.disabled= false;
  }
}
