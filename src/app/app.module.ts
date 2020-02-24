import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TokenInterceptor} from "./_helpers/httpinterceptor";

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './_services/auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
