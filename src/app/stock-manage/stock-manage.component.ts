import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Piece } from '../models/piece';
import { PieceService } from '../service/pieceService';
import { DataSource } from '@angular/cdk/collections';
import {Observable} from 'rxjs/Rx';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Element } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StockUpdateDialogComponent } from '../stock-update-dialog/stock-update-dialog.component';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css'],
  providers: [PieceService]

})
export class StockManageComponent implements OnInit {

  ELEMENT_DATA: Array<Piece>;
  displayedColumns = ['reference_name', 'lot_number', 'quantity', 'action'];
  quantity : string;
  myData: Array <any>;
  dataSource : MatTableDataSource<Piece>;
  private stockUrlList = "/stock-manage";
  static searchMode = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('filter') filter: ElementRef;


  constructor(private pieceService: PieceService,public dialog: MatDialog, private router:Router, private notif: NotificationsService) {
    this.startRequest();
  }

  startRequest() {
    this.pieceService.getAllPieces(this.stockUrlList)
    .subscribe(res => {
      this.dataSource = null;
      this.ELEMENT_DATA  = new Array<Piece>();
      for(let i =0; i< res.length; i++){
        this.ELEMENT_DATA.push(res[i]);
      }
      setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.ELEMENT_DATA);
      this.stopLoading();
     
     }, 1000);
      
    });
  }

  openDialog(id): void {
    let dialogRef = this.dialog.open(StockUpdateDialogComponent, {
      width: '30%',
      height: '30%',
      data: {pieceId: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.pieceId != undefined){
        this.pieceService.updatePiece(result.pieceId, result.quantity).subscribe(result => {
          if(result.status == true){
            console.log("update success");
            this.notif.success(
              'Success',
              "modification reussite",
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
              "modification échoué",
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
    });
  }

  goToAddActivity(){
    this.router.navigate(['/stock-manage/new-stock']);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  deletePiece(piece: Piece, event){
    if(confirm("etes vous sur de vouloir supprime cette pièce?")) {
      this.pieceService.delete(piece._id).subscribe(result => {
        if(result.status == true){
          console.log("piece was deleted");
          this.notif.success(
            'Success',
            "La pièce a bien été supprimée",
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
      })
    }
    event.stopPropagation();
  }

  ngOnInit() {
   this.startLoading();
  }

  startLoading(){
    var formElement = <HTMLFormElement>document.getElementById('customLoadingProgressBar');
    formElement.style.display='block';
    var formElement = <HTMLFormElement>document.getElementById('stockList-mat-row');
    if(formElement != null){
      formElement.style.display='none';
    }
    var formElement = <HTMLFormElement>document.getElementById('paginator');
    if(formElement != null){
      formElement.style.display='none';
    }
  }

  stopLoading(){
    var formElement = <HTMLFormElement>document.getElementById('customLoadingProgressBar');
    formElement.style.display='none';
    
    var formElement = <HTMLFormElement>document.getElementById('stockList-mat-row');
    if(formElement != null){
      formElement.style.display='block';
    }
    var formElement = <HTMLFormElement>document.getElementById('paginator');
    if(formElement != null){
      formElement.style.display='block';
    }
  }

  changePrintMode(){
    if(StockManageComponent.searchMode == 1){
      var formElement = <HTMLFormElement>document.getElementById('quantity_cdk');
      formElement.innerHTML = "quantité -";
      this.sortByDesc();
      StockManageComponent.searchMode = 2; 
    }
    else {
      var formElement = <HTMLFormElement>document.getElementById('quantity_cdk');
      formElement.innerHTML = "quantité +";
      this.sortByAsc();
      StockManageComponent.searchMode = 1;
    }
  }


  sortByAsc(){
    this.ELEMENT_DATA = this.ELEMENT_DATA.sort((n1,n2) => {
      if (n1.quantity < n2.quantity) {
          return 1;
      }
  
      if (n1.quantity > n2.quantity) {
          return -1;
      }
      return 0;
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  sortByDesc(){
    this.ELEMENT_DATA = this.ELEMENT_DATA.sort((n1,n2) => {
      if (n1.quantity > n2.quantity) {
          return 1;
      }
  
      if (n1.quantity < n2.quantity) {
          return -1;
      }
      return 0;
    });
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
