import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FuterComponent } from './futer/futer.component';
import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {IsLoggedIn} from '../app/isLogged.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import{CheckformserviceService} from './checkformservice.service';
import{AuthserviceService} from './authservice.service';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { PultComponent } from './pult/pult.component';
import {ChatService} from './chat.service';
const appRoute: Routes = [
  { path:'',component: HomeComponent },
  { path:'auth',component: LoginComponent },
  { path:'reg',component: LogupComponent },
  { path:'dashboard',component: DashboardComponent,canActivate:[IsLoggedIn] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FuterComponent,
    LoginComponent,
    LogupComponent,
    HomeComponent,
    DashboardComponent,
    PultComponent
  ],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatInputModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule
  ],
  providers: [ChatService,CheckformserviceService,AuthserviceService,IsLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
