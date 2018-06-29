import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./login-component/login.component";
import {RealChatComponent} from "./realChat-component/realChat.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full'},
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'chat', component: RealChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)] ,
  exports: [RouterModule]
})

export class AppRoutingModule {}
