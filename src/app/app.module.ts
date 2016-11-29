import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ENV_PROVIDERS } from './environment';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './_guards/index';
import { HttpClient, Util } from './_libraries/index';
import { AlertService, AuthService } from './services/index';

import { HomeModule } from './components/home/home.module';
import { LoginComponent } from './components/login/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    HomeModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    ENV_PROVIDERS,
    AUTH_PROVIDERS,
    AuthGuard,
    HttpClient, Util,
    AlertService, AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

