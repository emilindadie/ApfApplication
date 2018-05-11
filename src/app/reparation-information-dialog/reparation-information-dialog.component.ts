import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Fresenius } from '../models/fresenius';
import { User } from '../models/user';

@Component({
  selector: 'app-reparation-information-dialog',
  templateUrl: './reparation-information-dialog.component.html',
  styleUrls: ['./reparation-information-dialog.component.css']
})
export class ReparationInformationDialogComponent implements OnInit {
  fresenius:Fresenius = new Fresenius();
  reparator: User = new User();
  test_validator: User = new User();
  send_validator: User = new User();
  last_modificator: User = new User();

  constructor(public dialogRef: MatDialogRef<ReparationInformationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.fresenius = data.fresenius;
    this.reparator = data.reparator;
    this.test_validator = data.test_validator;
    this.send_validator = data.send_validator;
    this.last_modificator = data.last_modificator;
  }

  ngOnInit() {
    console.log(this.test_validator);
    console.log(this.last_modificator);
  }

  closeInformation(){

   this.dialogRef.close();
  }

}
