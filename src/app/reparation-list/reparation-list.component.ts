import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Fresenius } from '../models/fresenius';
import { FreseniusService } from '../service/freseniusService';
import { DataSource } from '@angular/cdk/collections';
import { filter } from 'rxjs/operator/filter';
import {Observable} from 'rxjs/Rx';
import { MatTableDataSource,  MatSort, MatSnackBar, MatPaginator} from '@angular/material';
import { Element } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-reparation-list',
  templateUrl: './reparation-list.component.html',
  styleUrls: ['./reparation-list.component.css'],
  providers: [FreseniusService]
})

export class ReparationListComponent implements OnInit {
  
  selected  = 'all';
  states = [
    {value: 'all', viewValue: 'Status'},
    {value: 'tested', viewValue: 'Test validé'},
    {value: 'notTested', viewValue: 'Test non validé'},
    {value: 'complete', viewValue: 'Complete'}
  ];

  displayedColumns = ['device_number', 'status', 'fresenius_date','fresenius_type'];
  myData: Array <any>;
  ELEMENT_DATA: Array<Fresenius>;
  dataSource : MatTableDataSource<Fresenius>;
  private stockUrlList = "/stock-manage";
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('filter') filter: ElementRef;
  
  constructor(private freseniusService: FreseniusService,private router:Router, private notif: NotificationsService) {
    this.startRequest();
  }


  startRequest() {
    this.freseniusService.getFreseniusz()
    .subscribe(res => {
      for(let i =0; i< res.piecesNotifQuantity.length; i++){
        console.log("le stock de la piece "+res.piecesNotifQuantity[i].reference_name+" est bientot épuisé");
        this.notif.error(
          'Error',
          "le stock de la piece "+res.piecesNotifQuantity[i].reference_name+" est bientot épuisé",
          {
            timeOut: 15000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
      this.dataSource = null;
      this.ELEMENT_DATA  = new Array<Fresenius>();
      for(let i =0; i< res.fresenius.length; i++){
        this.ELEMENT_DATA.push(res.fresenius[i]);
      }
      setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.stopLoading();
     
     }, 1000);
      
    });
  }

  ngOnInit() {
    this.startLoading()
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
      console.log("Selected "+this.selected);
      this.dataSource.filter = '';
     
    }else if(event.value == "tested") {
      this.selected = 'tested';
      console.log("Selected "+this.selected);
      this.dataSource.filter = 'test validé';
      
    }
    else if(event.value == "notTested") {
      this.selected = 'notTested';
      this.dataSource.filter = 'test non validé';
    }
    else if(event.value == "complete") {
      this.selected = 'complete';
      this.dataSource.filter = 'complete';
    }
  }

  onSelect(fresenius:Fresenius, event){
    this.router.navigate(['/home/fresenius/reparation-list/reparation-details', fresenius._id]);
    event.stopPropagation();
  }

  goToAddActivity(){
    this.router.navigate(['/home/fresenius/reparation-list/new-reparation']);
  }
}

