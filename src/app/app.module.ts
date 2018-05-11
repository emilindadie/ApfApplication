import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './service/userService';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewReparationComponent } from './new-reparation/new-reparation.component';
import { FreseniusService } from './service/freseniusService';
import { ReparationListComponent } from './reparation-list/reparation-list.component';
import { MaterialModule } from './material/module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewStockComponent } from './new-stock/new-stock.component';
import { PieceService } from './service/pieceService';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormField,
  MatCardModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatRadioModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule,
  MatChipsModule,
  MatOptionModule,
} from '@angular/material';
import { ReparationDetailsComponent } from './reparation-details/reparation-details.component';
import { StockManageComponent } from './stock-manage/stock-manage.component';
import { StockUpdateDialogComponent } from './stock-update-dialog/stock-update-dialog.component';
import { AuthenticatedGuard } from './guard/authenticatedGuard';
import { AuthService } from './service/authService';
import { FreseniusComponent } from './fresenius/fresenius.component';
import { ReparationStateUpdateDialogComponent } from './reparation-state-update-dialog/reparation-state-update-dialog.component';
import { ReparationInformationDialogComponent } from './reparation-information-dialog/reparation-information-dialog.component';
import { ReparationInformationUpdateDialogComponent } from './reparation-information-update-dialog/reparation-information-update-dialog.component';
import { OperationsComponent } from './operations/operations.component';
import { OperationService } from './service/operationService';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, 
    data: { title: 'Login page' }
  },
  
  {
    path: 'sign-up',
    component: SignUpComponent, 
    data: { title: 'SignUp page' }
  },

  {
    path: 'home',
    canActivate: [AuthenticatedGuard],
    component: HomeComponent,
    data: { title: 'Home page' }
  },

  {
    path: 'operations',
    canActivate: [AuthenticatedGuard],
    component: OperationsComponent,
    data: { title: 'Operation page' }
  },

  {
    path: 'home/fresenius',
    canActivate: [AuthenticatedGuard],
    component: FreseniusComponent,
  },
  
  {
    path: 'home/fresenius/reparation-list/new-reparation',
    canActivate: [AuthenticatedGuard],
    component: NewReparationComponent,
    data: { title: 'new reparation page' }
  },


  {
    path: 'home/fresenius/reparation-list',
    canActivate: [AuthenticatedGuard],
    component: ReparationListComponent,
    data: { title: 'Reparation List page' }
  },


  {
    path: 'home/fresenius/reparation-list/reparation-details/:fresenius_id',
    canActivate: [AuthenticatedGuard],
    component: ReparationDetailsComponent,
    data: { title: 'Reparation Details page' }
  },

  {
    path: 'stock-manage/new-stock',
    canActivate: [AuthenticatedGuard],
    component: NewStockComponent,
    data: { title: 'Stock List page' }
  },

  {
    path: 'stock-manage',
    canActivate: [AuthenticatedGuard],
    component: StockManageComponent,
    data: { title: 'Stock manage page' }
  },

  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  { path: 'home',
  redirectTo: '/home',
  pathMatch: 'full'
  }
]


@NgModule({

  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    NewReparationComponent,
    ReparationListComponent,
    NewStockComponent,
    ReparationDetailsComponent,
    StockManageComponent,
    StockUpdateDialogComponent,
    FreseniusComponent,
    ReparationStateUpdateDialogComponent,
    ReparationInformationDialogComponent,
    ReparationInformationUpdateDialogComponent,
    OperationsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatAutocompleteModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatChipsModule,
    FlashMessagesModule.forRoot(),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild(routes),
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [UserService, FreseniusService, PieceService,AuthenticatedGuard, AuthService, OperationService, NotificationsService],
  bootstrap: [AppComponent],
  entryComponents: [StockUpdateDialogComponent, ReparationStateUpdateDialogComponent, ReparationInformationDialogComponent, ReparationInformationUpdateDialogComponent]
})
export class AppModule { }
