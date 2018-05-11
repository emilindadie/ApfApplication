import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Operation } from '../models/operation';
import { MatTableDataSource, MatSort, MatSnackBar, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { UserService } from '../service/userService';
import {Observable} from 'rxjs/Rx'
import { User } from '../models/user';
import 'rxjs/add/operator/filter';
import { BehaviorSubject } from 'rxjs';
import { Data, Router } from '@angular/router';
import { Piece } from '../models/piece';
import { filter } from 'rxjs/operator/filter';
import { Element } from '@angular/compiler';
import { SelectionModel } from '@angular/cdk/collections';
import { OperationService } from '../service/operationService';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  static searchIndex = 1;
  selected  = 'all';

  displayedColumns = ['operator_name', 'operation_name', 'content','date'];

  states = [
    {value: 'all', viewValue: 'Toutes les opérations'},
    {value: 'new-stock', viewValue: 'Nouvelle pièce'},
    {value: 'stock-update', viewValue: 'Mise à jour du stock'},
    {value: 'new-reparation', viewValue: 'Nouvelle réparation'},
    {value: 'reparation-state-update', viewValue: 'Changement de status'},
    {value: 'reparation-information-update', viewValue: 'Modification des informations'},
    {value: 'piece-delete', viewValue: 'Suppression de pièce'}

  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('filter') filter: ElementRef;

  myData: Array <any>;
  ELEMENT_DATA: Array<Operation>;
  dataSource : MatTableDataSource<Operation>;
  private operationUrlList = "/operations";

  constructor(private operationService: OperationService,private router:Router) {
    this.startRequest();
  }

  startRequest() {
    this.operationService.getAllOperation(this.operationUrlList)
    .subscribe(res => {
     
      this.dataSource = null;
      this.ELEMENT_DATA  = new Array<Operation>();
      for(let i =0; i< res.length; i++){
        this.ELEMENT_DATA.push(res[i]);
      }
      setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("elemnt data");
      console.log(this.ELEMENT_DATA);
      this.stopLoading();
     }, 1000);
      
    });
  }
  ngOnInit() {
   this.startLoading();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  startLoading(){
    var formElement = <HTMLFormElement>document.getElementById('customLoadingProgressBar');
    formElement.style.display='block';
    var formElement = <HTMLFormElement>document.getElementById('paginator');
    if(formElement != null){
      formElement.style.display='none';
    }
  }

  stopLoading(){
    var formElement = <HTMLFormElement>document.getElementById('customLoadingProgressBar');
    formElement.style.display='none';
    var formElement = <HTMLFormElement>document.getElementById('paginator');
    if(formElement != null){
      formElement.style.display='block';
    }
  }

  onChange(event) {
    if(event.value == 'all'){
      this.selected = 'all';
      this.dataSource.filter = '';
      
    }else if(event.value == "new-stock") {
      this.selected = 'new-stock';
      this.dataSource.filter = 'Création d\'une pièce';
    }
    else if(event.value == "stock-update") {
      this.selected = 'stock-update';
      this.dataSource.filter = 'Mise à jour d\'une pièce';
    }
    else if(event.value == "new-reparation") {
      this.selected = 'new-reparation';
      this.dataSource.filter = 'Nouvelle reparation';
    }
    else if(event.value == "reparation-state-update") {
      this.selected = 'reparation-state-update';
      this.dataSource.filter =  'Mise à jour du status d\'un appareil';
    }
    else if(event.value == "reparation-information-update") {
      this.selected = 'reparation-information-update';
      this.dataSource.filter = 'Mise à jour des informations d\'un appareil';
    }
    else {
      this.selected = 'piece-delete';
      this.dataSource.filter =  'Suppression de pièce';
    }
  }
}
