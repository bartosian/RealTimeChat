import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WrapChatComponent } from './wrapChat-component/wrapChat.component';
import { LoginComponent } from './login-component/login.component';
import { RealChatComponent } from './realChat-component/realChat.component';
import {AppRoutingModule} from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapChatComponent,
    LoginComponent,
    RealChatComponent,
    RegisterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
